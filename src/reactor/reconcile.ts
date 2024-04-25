import {
  IFiber,
  TElement,
  IFunctionalComponent,
  IAttributes,
  THTMLElementEx,
  TNode,
  TEffect,
} from './type'
import { createElement } from './dom'
import { resetCursor } from './hook'
import { schedule, shouldYield } from './schedule'
import { createText, arrayfy } from './util'
import { commit, removeElement } from './commit'

let currentFiber: IFiber = null
let rootFiber = null

export const enum TAG {
  UPDATE = 'UPDATE',
  INSERT = 'INSERT',
  REMOVE = 'REMOVE',
  SVG = 'SVG',
  DIRTY = 'DIRTY',
  MOVE = 'MOVE',
  REPLACE = 'REPLACE',
}

export const render = (vnode: TElement, node: Node): void => {
  rootFiber = {
    node,
    props: { children: vnode },
  } as IFiber
  update(rootFiber)
}

export const update = (fiber?: IFiber) => {
  if (!fiber.dirty) {
    fiber.dirty = true
    schedule(() => reconcile(fiber))
  }
}

const reconcile = (fiber?: IFiber): boolean => {
  while (fiber && !shouldYield()) fiber = capture(fiber)
  if (fiber) return reconcile.bind(null, fiber)
  return null
}

const memo = (fiber: any) => {
  if ((fiber.type as IFunctionalComponent).memo && fiber.old?.props) {
    let updateFiber = (fiber.type as IFunctionalComponent).shouldUpdate || shouldUpdate
    if (!updateFiber(fiber.props, fiber.old.props)) {
      return getSibling(fiber)
    }
  }
  return null
}

const capture = (fiber: IFiber): IFiber | undefined => {
  fiber.isComponent = isFunctionalElement(fiber.type)
  if (fiber.isComponent) {
    const memoFiber = memo(fiber)
    if (memoFiber) {
      return memoFiber
    }
    updateHook(fiber)
  } else {
    updateHost(fiber)
  }
  if (fiber.child) return fiber.child
  const sibling = getSibling(fiber)
  return sibling
}

const getSibling = (fiber: IFiber<any>) => {
  while (fiber) {
    bubble(fiber)
    if (fiber.dirty) {
      fiber.dirty = false
      commit(fiber)
      return null
    }
    if (fiber.sibling) return fiber.sibling
    fiber = fiber.parent
  }
  return null
}

const bubble = (fiber: { isComponent: any; hooks: { effect: TEffect[] } }) => {
  if (fiber.isComponent) {
    if (fiber.hooks) {
      schedule(() => side(fiber.hooks.effect))
    }
  }
}


const shouldUpdate = (oldProps: { [x: string]: any }, newProps: { [x: string]: any }) => {
  for (const prop in oldProps) if (!(prop in newProps)) return true
  for (const prop in newProps) if (oldProps[prop] !== newProps[prop]) return true
}

const updateHook = <IProps = IAttributes>(fiber: IFiber): any => {
  resetCursor()
  currentFiber = fiber
  let children = (fiber.type as IFunctionalComponent<IProps>)(fiber.props)
  reconcileChidren(fiber, simpleVnode(children))
}

const updateHost = (fiber: IFiber): void => {
  fiber.parentNode = (getParentNode(fiber) as any) || {}
  if (!fiber.node) {
    if (fiber.type === 'svg') fiber.lane = TAG.SVG
    fiber.node = createElement(fiber) as THTMLElementEx
  }
  reconcileChidren(fiber, fiber.props.children)
}

const simpleVnode = (type: any) =>
  isText(type) ? createText(type as string) : type

const getParentNode = (fiber: IFiber): HTMLElement | undefined => {
  while ((fiber = fiber.parent)) {
    if (!fiber.isComponent) return fiber.node
  }
}

const reconcileChidren = (fiber: any, children: TNode): void => {
  let oldChildren = fiber.children || [],
    newChildren = (fiber.children = arrayfy(children) as any)
  const actions = diff(oldChildren, newChildren)

  for (let i = 0, prev = null, len = newChildren.length; i < len; i++) {
    const child = newChildren[i]
    child.action = actions[i]
    if (fiber.lane === TAG.SVG) {
      child.lane = TAG.SVG
    }
    child.parent = fiber
    if (i > 0) {
      prev.sibling = child
    } else {
      fiber.child = child
    }
    prev = child
  }
}

function clone(referenceNode: { hooks: any; ref: any; node: any; children: any }, currentNode: { hooks: any; ref: any; node: any; children: any; old: any }) {
  currentNode.hooks = referenceNode.hooks
  currentNode.ref = referenceNode.ref
  currentNode.node = referenceNode.node
  currentNode.children = referenceNode.children
  currentNode.old = referenceNode
}

const side = (effects: TEffect[]): void => {
  effects.forEach(effect => effect[2] && effect[2]())
  effects.forEach(effect => (effect[2] = effect[0]()))
  effects.length = 0
}

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

  let i = 0, j = 0;
  while (i < oldVDOM.length || j < newVDOM.length) {
    const oldElement = oldVDOM[i];
    const newElement = newVDOM[j];

    if (oldElement === null) {
      i++;
    } else if (j >= newVDOM.length) {
      removeElement(oldElement);
      i++;
    } else if (i >= oldVDOM.length) {
      actions.push({ operation: TAG.INSERT, currentFiber: newElement, referenceNode: oldVDOM[i] });
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
        actions.push({ operation: TAG.INSERT, currentFiber: newElement, referenceNode: oldVDOM[i] });
        j++;
      } else {
        clone(oldVDOM[wantedElementInOld], newElement);
        actions.push({ operation: TAG.MOVE, currentFiber: oldVDOM[wantedElementInOld], referenceNode: oldVDOM[i] });
        oldVDOM[wantedElementInOld] = null;
        j++;
      }
    }
  }
  return actions;
};


export const getCurrentFiber = () => currentFiber || null
export const isFunctionalElement = (x: any): x is Function => typeof x === 'function'
export const isText = (s: any): s is number | string =>
  typeof s === 'number' || typeof s === 'string'