export interface IRefObject<T> {
  current: T
}
export type TRef<T = any> = IRefObject<T> | null
export interface TElement<IProps extends IAttributes = any, T = string> {
  type?: T
  props?: IProps
  key?: string
}
export type TNode =
  | TText
  | TElement
  | TNode[]
  | boolean
  | null
  | undefined
export interface IAttributes extends Record<string, any> {
  key?: TKey
  children?: TNode
  ref?: TRef
}

export interface IFunctionalComponent<IProps extends IAttributes = {}> {
  (props: IProps): TElement<IProps> | null
  fiber?: IFiber
  type?: string
  memo?: boolean
  shouldUpdate?: (newProps: IProps, oldProps: IProps) => boolean
}

export interface IHook {
  list: TEffect[]
  effect: TEffect[]
}

export type TReference = (
  element: HTMLElement | undefined
) => void | { current?: HTMLElement }

export interface IFiber<IProps extends IAttributes = any> {
  key?: string
  type: string | IFunctionalComponent<IProps>
  parentNode: THTMLElementEx
  node: THTMLElementEx
  children?: any
  dirty:boolean,
  parent?: IFiber<IProps>
  sibling?: IFiber<IProps>
  child?: IFiber<IProps>
  done?: () => void
  ref: TReference
  hooks: IHook
  oldProps: IProps
  action: any
  props: IProps
  lane: string
  isComponent: boolean
}
export type TText = string | number
export type TKey = TText
export type THTMLElementEx = HTMLElement & { last: IFiber | null }
export type THooks = 'list' | 'effect'
export type TEffect = [Function?, number?, Function?]
export type TSetStateAction<State> = State | ((prevState: State) => State)
export type TDispatch<Action> = (value: Action, resume?: boolean) => void
export type TReducer<State, Action> = (prevState: State, action: Action) => State
export type TVoidCallback = () => void
export type TEffectCallback = () => void | (TVoidCallback | undefined)
export type TTaskCallback = ((time: boolean) => boolean) | null
export type TDependencyList = Array<any>
export type TDOM = HTMLElement | SVGElement

export interface IPropsWithChildren {
  children?: TNode
}

export interface ITask {
  callback?: TTaskCallback
  fiber: IFiber
}
