import {
  IFiber,
  TElement,
  FC,
  Attributes,
  HTMLElementEx,
  TNode,
  IEffect,
  TText,
} from './type'
import { createElement } from './dom'
import { resetCursor } from './hook'
import { schedule, shouldYield } from './schedule'
import { isArr, createText } from './util'
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
  if ((fiber.type as FC).memo && fiber.old?.props) {
    let scu = (fiber.type as FC).shouldUpdate || shouldUpdate
    if (!scu(fiber.props, fiber.old.props)) {
      return getSibling(fiber)
    }
  }
  return null
}

const capture = (fiber: IFiber): IFiber | undefined => {
  fiber.isComponent = isFn(fiber.type)
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

const bubble = (fiber: { isComponent: any; hooks: { layout: IEffect[]; effect: IEffect[] } }) => {
  if (fiber.isComponent) {
    if (fiber.hooks) {
      side(fiber.hooks.layout)
      schedule(() => side(fiber.hooks.effect))
    }
  }
}


const shouldUpdate = (a: { [x: string]: any }, b: { [x: string]: any }) => {
  for (let i in a) if (!(i in b)) return true
  for (let i in b) if (a[i] !== b[i]) return true
}

const updateHook = <P = Attributes>(fiber: IFiber): any => {
  resetCursor()
  currentFiber = fiber
  let children = (fiber.type as FC<P>)(fiber.props)
  reconcileChidren(fiber, simpleVnode(children))
}

const updateHost = (fiber: IFiber): void => {
  fiber.parentNode = (getParentNode(fiber) as any) || {}
  if (!fiber.node) {
    if (fiber.type === 'svg') fiber.lane = TAG.SVG
    fiber.node = createElement(fiber) as HTMLElementEx
  }
  reconcileChidren(fiber, fiber.props.children)
}

const simpleVnode = (type: any) =>
  isStr(type) ? createText(type as string) : type

const getParentNode = (fiber: IFiber): HTMLElement | undefined => {
  while ((fiber = fiber.parent)) {
    if (!fiber.isComponent) return fiber.node
  }
}

const reconcileChidren = (fiber: any, children: TNode): void => {
  let aCh = fiber.children || [],
    bCh = (fiber.children = arrayfy(children) as any)
  const actions = diff(aCh, bCh)

  for (let i = 0, prev = null, len = bCh.length; i < len; i++) {
    const child = bCh[i]
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

function clone(a: { hooks: any; ref: any; node: any; children: any }, b: { hooks: any; ref: any; node: any; children: any; old: any }) {
  b.hooks = a.hooks
  b.ref = a.ref
  b.node = a.node
  b.children = a.children
  b.old = a
}

export const arrayfy = (arr: boolean | TText | TElement<any, string> | TNode[] | null | undefined) => (!arr ? [] : isArr(arr) ? arr : [arr])

const side = (effects: IEffect[]): void => {
  effects.forEach(e => e[2] && e[2]())
  effects.forEach(e => (e[2] = e[0]()))
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
      actions.push({ operation: TAG.INSERT, elm: newElement, before: oldVDOM[i] });
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
        actions.push({ operation: TAG.INSERT, elm: newElement, before: oldVDOM[i] });
        j++;
      } else {
        clone(oldVDOM[wantedElementInOld], newElement);
        actions.push({ operation: TAG.MOVE, elm: oldVDOM[wantedElementInOld], before: oldVDOM[i] });
        oldVDOM[wantedElementInOld] = null;
        j++;
      }
    }
  }
  return actions;
};


export const getCurrentFiber = () => currentFiber || null
export const isFn = (x: any): x is Function => typeof x === 'function'
export const isStr = (s: any): s is number | string =>
  typeof s === 'number' || typeof s === 'string'