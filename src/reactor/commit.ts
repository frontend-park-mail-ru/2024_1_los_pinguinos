import { TReference } from './type';
import { updateElement } from './dom';
import { isFunctionalElement, TAG } from './reconcile';

/**
 * Commits changes to the DOM based on the fiber node's action.
 *
 * @function commit
 * @param {any} fiber - The fiber node containing the changes.
 */
export const commit = (fiber: any) => {
    if (!fiber) {
        return;
    }
    const { operation, referenceNode, currentFiber } = fiber.action || {};
    if (operation === TAG.INSERT || operation === TAG.MOVE) {
        if (fiber.isComponent && fiber.child) {
            fiber.child.action.operation = fiber.action.operation;
        } else {
            fiber.parentNode.insertBefore(
                currentFiber.node,
                referenceNode?.node,
            );
        }
    }
    if (operation === TAG.UPDATE) {
        if (fiber.isComponent && fiber.child) {
            fiber.child.action.operation = fiber.action.operation;
        } else {
            updateElement(fiber.node, fiber.old.props || {}, fiber.props);
        }
    }

    refer(fiber.ref, fiber.node);

    fiber.action = null;

    commit(fiber.child);
    commit(fiber.sibling);
};

/**
 * Sets a reference to a DOM element.
 *
 * @function refer
 * @param {TReference} ref - The reference object.
 * @param {HTMLElement} [dom] - The DOM element to set the reference to.
 */
const refer = (ref: TReference, dom?: HTMLElement): void => {
    if (ref)
        isFunctionalElement(ref)
            ? ref(dom)
            : ((ref as { current?: HTMLElement })!.current = dom);
};

/**
 * Recursively sets references of child elements to undefined.
 *
 * @function childrenRefer
 * @param {any} children - The child elements.
 */
const childrenRefer = (children: any): void => {
    children.forEach((child: { children: any; ref: TReference }) => {
        child.children && childrenRefer(child.children);
        refer(child.ref, undefined);
    });
};

/**
 * Removes a fiber node and its children from the DOM.
 *
 * @function removeElement
 * @param {Object} fiber - The fiber node to remove.
 */
export const removeElement = (fiber: {
    isComponent: any;
    hooks: { list: any[] };
    children: any[];
    parentNode: { removeChild: (arg0: any) => void };
    node: any;
    ref: TReference;
}) => {
    if (fiber.isComponent) {
        fiber.hooks &&
            fiber.hooks.list.forEach(
                (effect: (() => any)[]) => effect[2] && effect[2](),
            );
        fiber.children.forEach(removeElement);
    } else {
        fiber.parentNode.removeChild(fiber.node);
        childrenRefer(fiber.children);
        refer(fiber.ref, undefined);
    }
};
