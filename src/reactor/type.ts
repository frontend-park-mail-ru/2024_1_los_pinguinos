export type Key = TText
export interface RefObject<T> {
  current: T
}

export type RefCallback<T> = {
  bivarianceHack(instance: T | null): void
}['bivarianceHack']
export type Ref<T = any> = RefCallback<T> | RefObject<T> | null

export interface Attributes extends Record<string, any> {
  key?: Key
  children?: TNode
  ref?: Ref
}

export interface FC<P extends Attributes = {}> {
  (props: P): TElement<P> | null
  fiber?: IFiber
  type?: string
  memo?: boolean
  shouldUpdate?: (newProps: P, oldProps: P) => boolean
}

export interface TElement<P extends Attributes = any, T = string> {
  type: T
  props: P
  key: string
}

export type HookTypes = 'list' | 'effect' | 'layout'

export interface IHook {
  list: IEffect[]
  layout: IEffect[]
  effect: IEffect[]
}

export type IRef = (
  e: HTMLElement | undefined
) => void | { current?: HTMLElement }

export interface IFiber<P extends Attributes = any> {
  key?: string
  type: string | FC<P>
  parentNode: HTMLElementEx
  node: HTMLElementEx
  children?: any
  dirty:boolean,
  parent?: IFiber<P>
  sibling?: IFiber<P>
  child?: IFiber<P>
  done?: () => void
  ref: IRef
  hooks: IHook
  oldProps: P
  action: any
  props: P
  lane: string
  isComponent: boolean
}

export type HTMLElementEx = HTMLElement & { last: IFiber | null }
export type IEffect = [Function?, number?, Function?]

export type TText = string | number
export type TNode =
  | TText
  | TElement
  | TNode[]
  | boolean
  | null
  | undefined
export type SetStateAction<S> = S | ((prevState: S) => S)
export type Dispatch<A> = (value: A, resume?: boolean) => void
export type Reducer<S, A> = (prevState: S, action: A) => S
export type IVoidCb = () => void
export type EffectCallback = () => void | (IVoidCb | undefined)
export type DependencyList = Array<any>

export interface PropsWithChildren {
  children?: TNode
}

export type ITaskCallback = ((time: boolean) => boolean) | null

export interface ITask {
  callback?: ITaskCallback
  fiber: IFiber
}

export type DOM = HTMLElement | SVGElement
