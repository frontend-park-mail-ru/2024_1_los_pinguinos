import { update, isFunctionalElement, getCurrentFiber } from "./reconcile"
import {
  TDependencyList,
  TReducer,
  IFiber,
  TDispatch,
  TSetStateAction,
  TEffectCallback,
  THooks,
  TEffect,
  IRefObject,
  TNode,
} from "./type"

let cursor = 0
export const resetCursor = () => {
  cursor = 0
}

export const useState = <T>(initState: T): [T, TDispatch<TSetStateAction<T>>] => {
  return useReducer(undefined, initState)
}

export const useReducer = <State, Action>(
  reducer?: TReducer<State, Action>,
  initState?: State
): [State, TDispatch<Action>] => {
  const [hook, current]: [any, IFiber] = getHook<State>(cursor++)
  if (hook.length === 0) {
    hook[0] = initState
    hook[1] = (value: Action | TDispatch<Action>) => {
      let v = reducer
        ? reducer(hook[0], value as any)
        : isFunctionalElement(value)
          ? value(hook[0])
          : value
      if (hook[0] !== v) {
        hook[0] = v
        update(current)
      }
    }
  }
  return hook
}

export const useEffect = (cb: TEffectCallback, deps?: TDependencyList): void => {
  return effectImpl(cb, deps!, "effect")
}

const effectImpl = (
  cb: TEffectCallback,
  deps: TDependencyList,
  key: THooks
): void => {
  const [hook, current] = getHook(cursor++)
  if (isChanged(hook[1], deps)) {
    hook[0] = cb
    hook[1] = deps
    current.hooks[key].push(hook)
  }
}

export const getHook = <State = Function | undefined, Dependency = any>(
  cursor: number
): [[State, Dependency], IFiber] => {
  const current: IFiber<any> = getCurrentFiber()
  const hooks =
    current.hooks || (current.hooks = { list: [], effect: [] })
  if (cursor >= hooks.list.length) {
    hooks.list.push([] as TEffect)
  }
  return [(hooks.list[cursor] as unknown) as [State, Dependency], current]
}

export const isChanged = (oldDepList: TDependencyList, newDepList: TDependencyList) => {
  return !oldDepList || oldDepList.length !== newDepList.length || newDepList.some((arg, index) => !Object.is(arg, oldDepList[index]))
}
