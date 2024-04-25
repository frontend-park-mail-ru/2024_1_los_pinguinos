import { isStr, arrayfy } from './reconcile'
import { FC, TElement } from './type'

export const createElement = (type: any, props: any, ...children: any[]) => {
  props = props || {}
  children = flat(arrayfy(props.children || children))

  if (children.length) props.children = children.length === 1 ? children[0] : children

  const key = props.key || null
  const ref = props.ref || null

  if (key) props.key = undefined
  if (ref) props.ref = undefined

  return createVnode(type, props, key, ref)
}

const some = (x: unknown) => x != null && x !== true && x !== false

const flat = (arr: any[], target: any[] = []) => {
  arr.forEach(v => {
    isArr(v)
      ? flat(v, target)
      : some(v) && target.push(isStr(v) ? createText(v) : v)
  })
  return target
}

export const createVnode = (type: any, props: any, key: any, ref: any) => ({
  type,
  props,
  key,
  ref,
})

export const createText = (vnode: any) =>
  ({ type: '#text', props: { nodeValue: vnode + '' } } as TElement)

export function Fragment(props: { children: any }) {
  return props.children
}

export function memo<T extends object>(fn: FC<T>, compare?: FC<T>['shouldUpdate']) {
  fn.memo = true
  fn.shouldUpdate = compare
  return fn
}

export const isArr = Array.isArray

export const clsx = (...args: string[]) =>
  args.filter((arg) => typeof arg === 'string').join(' ');