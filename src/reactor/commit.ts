import { IFiber, IRef } from './type'
import { updateElement } from './dom'
import { isFn, TAG } from './reconcile'


export const commit = (fiber: any) => {
  if (!fiber) {
    return
  }
  const { operation, before, elm } = fiber.action || {}
  if (operation === TAG.INSERT || operation === TAG.MOVE) {
    if (fiber.isComponent && fiber.child) {
      fiber.child.action.operation = fiber.action.operation
    } else {
      fiber.parentNode.insertBefore(elm.node, before?.node)
    }
  }
  if (operation === TAG.UPDATE) {
    if (fiber.isComponent && fiber.child) {
      fiber.child.action.operation = fiber.action.operation
    } else {
      updateElement(fiber.node, fiber.old.props || {}, fiber.props)
    }
  }

  refer(fiber.ref, fiber.node)

  fiber.action = null

  commit(fiber.child)
  commit(fiber.sibling)
}

const refer = (ref: IRef, dom?: HTMLElement): void => {
  if (ref)
    isFn(ref) ? ref(dom) : ((ref as { current?: HTMLElement })!.current = dom)
}

const childrenRefer = (children: any): void => {
  children.forEach((child: { children: any; ref: IRef }) => {
    child.children && childrenRefer(child.children)
    refer(child.ref, undefined)
  })
}

export const removeElement = (fiber: { isComponent: any; hooks: { list: any[] }; children: any[]; parentNode: { removeChild: (arg0: any) => void }; node: any; ref: IRef }) => {
  if (fiber.isComponent) {
    fiber.hooks && fiber.hooks.list.forEach((e: (() => any)[]) => e[2] && e[2]())
    fiber.children.forEach(removeElement)
  } else {
    fiber.parentNode.removeChild(fiber.node)
    childrenRefer(fiber.children)
    refer(fiber.ref, undefined)
  }
}