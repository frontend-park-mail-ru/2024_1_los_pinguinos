import { TReference } from './type'
import { updateElement } from './dom'
import { isFunctionalElement, TAG } from './reconcile'


export const commit = (fiber: any) => {
  if (!fiber) {
    return
  }
  const { operation, referenceNode, currentFiber } = fiber.action || {}
  if (operation === TAG.INSERT || operation === TAG.MOVE) {
    if (fiber.isComponent && fiber.child) {
      fiber.child.action.operation = fiber.action.operation
    } else {
      fiber.parentNode.insertBefore(currentFiber.node, referenceNode?.node)
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

const refer = (ref: TReference, dom?: HTMLElement): void => {
  if (ref)
    isFunctionalElement(ref) ? ref(dom) : ((ref as { current?: HTMLElement })!.current = dom)
}

const childrenRefer = (children: any): void => {
  children.forEach((child: { children: any; ref: TReference }) => {
    child.children && childrenRefer(child.children)
    refer(child.ref, undefined)
  })
}

export const removeElement = (fiber: { isComponent: any; hooks: { list: any[] }; children: any[]; parentNode: { removeChild: (arg0: any) => void }; node: any; ref: TReference }) => {
  if (fiber.isComponent) {
    fiber.hooks && fiber.hooks.list.forEach((effect: (() => any)[]) => effect[2] && effect[2]())
    fiber.children.forEach(removeElement)
  } else {
    fiber.parentNode.removeChild(fiber.node)
    childrenRefer(fiber.children)
    refer(fiber.ref, undefined)
  }
}