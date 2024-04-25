import { isText } from './reconcile'
import { IFunctionalComponent, TElement, TNode, TText } from './type'

export const arrayfy = (arr: boolean | TText | TElement<any, string> | TNode[] | null | undefined) => (!arr ? [] : isArr(arr) ? arr : [arr])

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

const flat = (array: any[]) => {
  const flattenedArray = array.flat(Infinity);

  return flattenedArray.reduce((acc, item) => {
    if (item !== null && typeof item !== 'boolean') {
      acc.push(isText(item) ? createText(item) : item);
    }
    return acc;
  }, []);
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

export function memo<T extends object>(func: IFunctionalComponent<T>, compare?: IFunctionalComponent<T>['shouldUpdate']) {
  func.memo = true
  func.shouldUpdate = compare
  return func
}

export const isArr = Array.isArray