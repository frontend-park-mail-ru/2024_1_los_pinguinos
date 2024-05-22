import {
    IFiber,
    TElement,
    IFunctionalComponent,
    IAttributes,
    THTMLElementEx,
    TNode,
    TEffect,
} from './type';
import { createElement } from './dom';
import { resetCursor } from './hook';
import { schedule, shouldYield } from './schedule';
import { createText, arrayfy } from './util';
import { commit, removeElement } from './commit';

let currentFiber: IFiber = null;
let rootFiber: any = null;

export const enum TAG {
    UPDATE = 'UPDATE',
    INSERT = 'INSERT',
    REMOVE = 'REMOVE',
    SVG = 'SVG',
    DIRTY = 'DIRTY',
    MOVE = 'MOVE',
    REPLACE = 'REPLACE',
}

/**
 * Renders a virtual node into a DOM node.
 *
 * @function render
 * @param {TElement} vnode - The virtual node to render.
 * @param {Node} node - The DOM node to render into.
 */
export const render = (vnode: TElement, node: Node): void => {
    rootFiber = {
        node,
        props: { children: vnode },
    } as IFiber;
    update(rootFiber);
};

/**
 * Schedules an update for a fiber node.
 *
 * @function update
 * @param {IFiber} [fiber] - The fiber node to update.
 */
export const update = (fiber?: IFiber) => {
    if (!fiber.dirty) {
        fiber.dirty = true;
        schedule(() => reconcile(fiber));
    }
};

/**
 * Reconciles the fiber tree.
 *
 * @function reconcile
 * @param {IFiber} [fiber] - The fiber node to reconcile.
 * @returns {boolean} Whether the reconciliation should continue.
 */
const reconcile = (fiber?: IFiber): boolean => {
    while (fiber && !shouldYield()) fiber = capture(fiber);
    if (fiber) return reconcile.bind(null, fiber);
    return null;
};

/**
 * Memoizes a functional component fiber.
 *
 * @function memo
 * @param {any} fiber - The fiber node.
 * @returns {IFiber | null} The next sibling fiber or null.
 */
const memo = (fiber: any) => {
    if ((fiber.type as IFunctionalComponent).memo && fiber.old?.props) {
        let updateFiber =
            (fiber.type as IFunctionalComponent).shouldUpdate || shouldUpdate;
        if (!updateFiber(fiber.props, fiber.old.props)) {
            return getSibling(fiber);
        }
    }
    return null;
};

/**
 * Captures and processes a fiber node.
 *
 * @function capture
 * @param {IFiber} fiber - The fiber node to capture.
 * @returns {IFiber | undefined} The next fiber to process or undefined.
 */
const capture = (fiber: IFiber): IFiber | undefined => {
    fiber.isComponent = isFunctionalElement(fiber.type);
    if (fiber.isComponent) {
        const memoFiber = memo(fiber);
        if (memoFiber) {
            return memoFiber;
        }
        updateHook(fiber);
    } else {
        updateHost(fiber);
    }
    if (fiber.child) return fiber.child;
    const sibling = getSibling(fiber);
    return sibling;
};

/**
 * Gets the next sibling fiber node.
 *
 * @function getSibling
 * @param {IFiber<any>} fiber - The current fiber node.
 * @returns {IFiber | null} The next sibling fiber or null.
 */
const getSibling = (fiber: IFiber<any>) => {
    while (fiber) {
        bubble(fiber);
        if (fiber.dirty) {
            fiber.dirty = false;
            commit(fiber);
            return null;
        }
        if (fiber.sibling) return fiber.sibling;
        fiber = fiber.parent;
    }
    return null;
};

/**
 * Schedules side effects for a fiber node.
 *
 * @function bubble
 * @param {Object} fiber - The fiber node.
 */
const bubble = (fiber: { isComponent: any; hooks: { effect: TEffect[] } }) => {
    if (fiber.isComponent) {
        if (fiber.hooks) {
            schedule(() => side(fiber.hooks.effect));
        }
    }
};

/**
 * Determines if a component should update based on old and new props.
 *
 * @function shouldUpdate
 * @param {Object} oldProps - The old properties.
 * @param {Object} newProps - The new properties.
 * @returns {boolean} Whether the component should update.
 */
const shouldUpdate = (
    oldProps: { [x: string]: any },
    newProps: { [x: string]: any },
) => {
    for (const prop in oldProps) if (!(prop in newProps)) return true;
    for (const prop in newProps)
        if (oldProps[prop] !== newProps[prop]) return true;
};

/**
 * Updates the hook state for a functional component fiber.
 *
 * @function updateHook
 * @template IProps - The type of the properties.
 * @param {IFiber} fiber - The fiber node to update.
 * @returns {any} The updated hook state.
 */
const updateHook = <IProps = IAttributes>(fiber: IFiber): any => {
    resetCursor();
    currentFiber = fiber;
    let children = (fiber.type as IFunctionalComponent<IProps>)(fiber.props);
    reconcileChildren(fiber, simpleVnode(children));
};

/**
 * Updates the host node for a fiber.
 *
 * @function updateHost
 * @param {IFiber} fiber - The fiber node to update.
 */
const updateHost = (fiber: IFiber): void => {
    fiber.parentNode = (getParentNode(fiber) as any) || {};
    if (!fiber.node) {
        if (fiber.type === 'svg') fiber.lane = TAG.SVG;
        fiber.node = createElement(fiber) as THTMLElementEx;
    }
    reconcileChildren(fiber, fiber.props.children);
};

/**
 * Creates a simple vnode.
 *
 * @function simpleVnode
 * @param {any} type - The type of the vnode.
 * @returns {any} The created vnode.
 */
const simpleVnode = (type: any) =>
    isText(type) ? createText(type as string) : type;

/**
 * Gets the parent DOM node for a fiber.
 *
 * @function getParentNode
 * @param {IFiber} fiber - The fiber node.
 * @returns {HTMLElement | undefined} The parent DOM node or undefined.
 */
const getParentNode = (fiber: IFiber): HTMLElement | undefined => {
    while ((fiber = fiber.parent)) {
        if (!fiber.isComponent) return fiber.node;
    }
};

/**
 * Reconciles the children of a fiber node.
 *
 * @function reconcileChildren
 * @param {any} fiber - The parent fiber node.
 * @param {TNode} children - The children to reconcile.
 */
const reconcileChildren = (fiber: any, children: TNode): void => {
    let oldChildren = fiber.children || [],
        newChildren = (fiber.children = arrayfy(children) as any);
    const actions = diff(oldChildren, newChildren);

    for (let i = 0, prev = null, len = newChildren.length; i < len; i++) {
        const child = newChildren[i];
        child.action = actions[i];
        if (fiber.lane === TAG.SVG) {
            child.lane = TAG.SVG;
        }
        child.parent = fiber;
        if (i > 0) {
            prev.sibling = child;
        } else {
            fiber.child = child;
        }
        prev = child;
    }
};

/**
 * Clones a reference node to a current node.
 *
 * @function clone
 * @param {Object} referenceNode - The reference node.
 * @param {Object} currentNode - The current node.
 */
function clone(
    referenceNode: { hooks: any; ref: any; node: any; children: any },
    currentNode: { hooks: any; ref: any; node: any; children: any; old: any },
) {
    currentNode.hooks = referenceNode.hooks;
    currentNode.ref = referenceNode.ref;
    currentNode.node = referenceNode.node;
    currentNode.children = referenceNode.children;
    currentNode.old = referenceNode;
}

/**
 * Applies side effects for a list of effects.
 *
 * @function side
 * @param {TEffect[]} effects - The list of effects to apply.
 */
const side = (effects: TEffect[]): void => {
    effects.forEach((effect) => effect[2] && effect[2]());
    effects.forEach((effect) => (effect[2] = effect[0]()));
    effects.length = 0;
};

/**
 * Computes the difference between old and new virtual DOMs.
 *
 * @function diff
 * @param {any[]} oldVDOM - The old virtual DOM.
 * @param {any[]} newVDOM - The new virtual DOM.
 * @returns {Array} The list of actions to apply.
 */
const diff = (oldVDOM: any[], newVDOM: any[]) => {
    interface IndexMap {
        [key: string]: number;
    }
    const actions = [];
    const indexOld: IndexMap = {};
    const indexNew: IndexMap = {};
    const createKey = (item: { key: any; type: any }) => item.key + item.type;

    oldVDOM.forEach((item: any, index: any) => {
        indexOld[createKey(item)] = index;
    });

    newVDOM.forEach((item: any, index: any) => {
        indexNew[createKey(item)] = index;
    });

    let i = 0,
        j = 0;
    while (i < oldVDOM.length || j < newVDOM.length) {
        const oldElement = oldVDOM[i];
        const newElement = newVDOM[j];

        if (oldElement === null) {
            i++;
        } else if (j >= newVDOM.length) {
            removeElement(oldElement);
            i++;
        } else if (i >= oldVDOM.length) {
            actions.push({
                operation: TAG.INSERT,
                currentFiber: newElement,
                referenceNode: oldVDOM[i],
            });
            j++;
        } else if (createKey(oldElement) === createKey(newElement)) {
            clone(oldElement, newElement);
            actions.push({ operation: TAG.UPDATE });
            i++;
            j++;
        } else {
            const currentElementInNew = indexNew[createKey(oldElement)];
            const wantedElementInOld = indexOld[createKey(newElement)];

            if (currentElementInNew === undefined) {
                removeElement(oldElement);
                i++;
            } else if (wantedElementInOld === undefined) {
                actions.push({
                    operation: TAG.INSERT,
                    currentFiber: newElement,
                    referenceNode: oldVDOM[i],
                });
                j++;
            } else {
                clone(oldVDOM[wantedElementInOld], newElement);
                actions.push({
                    operation: TAG.MOVE,
                    currentFiber: oldVDOM[wantedElementInOld],
                    referenceNode: oldVDOM[i],
                });
                oldVDOM[wantedElementInOld] = null;
                j++;
            }
        }
    }
    return actions;
};

/**
 * Gets the current fiber node.
 *
 * @function getCurrentFiber
 * @returns {IFiber | null} The current fiber node or null.
 */
export const getCurrentFiber = () => currentFiber || null;

/**
 * Checks if a value is a functional component.
 *
 * @function isFunctionalElement
 * @param {any} x - The value to check.
 * @returns {boolean} True if the value is a functional component, false otherwise.
 */
export const isFunctionalElement = (x: any): x is Function =>
    typeof x === 'function';

/**
 * Checks if a value is a text node.
 *
 * @function isText
 * @param {any} s - The value to check.
 * @returns {boolean} True if the value is a text node, false otherwise.
 */
export const isText = (s: any): s is number | string =>
    typeof s === 'number' || typeof s === 'string';

/**
 * Removes the difference between old and new virtual DOMs.
 *
 * @function removeDiff
 * @param {any[]} oldVDOM - The old virtual DOM.
 * @param {any[]} newVDOM - The new virtual DOM.
 * @returns {Array} The list of actions to apply.
 */
const removeDiff = (oldVDOM: any[], newVDOM: any[]) => {
    interface IndexMap {
        [key: string]: number;
    }
    const actions: { operation: string; currentFiber: any }[] = [];
    const indexOld: IndexMap = {};
    const createKey = (item: { key: any; type: any }) => item.key + item.type;

    oldVDOM.forEach((item: any, index: any) => {
        indexOld[createKey(item)] = index;
    });

    oldVDOM.forEach((item: any) => {
        if (item !== null) {
            actions.push({ operation: 'REMOVE', currentFiber: item });
        }
    });

    return actions;
};

/**
 * Clears the virtual DOM.
 *
 * @function clearVDOM
 * @param {any} [root=rootFiber] - The root fiber node.
 */
export const clearVDOM = (root: any = rootFiber): void => {
    const removalActions = removeDiff(root.children || [], []);

    removalActions.forEach((action) => {
        if (action.operation === TAG.REMOVE) {
            removeElement(action.currentFiber);
        }
    });

    root.children = [];
};
