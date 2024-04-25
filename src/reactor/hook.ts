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
} from "./type"

const EMPTY_ARR = []

let cursor = 0

export const resetCursor = () => {
  cursor = 0
}

export const useState = <T>(initState: T): [T, TDispatch<TSetStateAction<T>>] => {
  return useReducer(undefined, initState)
}

export const useReducer = <S, A>(
  reducer?: TReducer<S, A>,
  initState?: S
): [S, TDispatch<A>] => {
  const [hook, current]: [any, IFiber] = getHook<S>(cursor++)
  if (hook.length === 0) {
    hook[0] = initState
    hook[1] = (value: A | TDispatch<A>) => {
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

export const isChanged = (a: TDependencyList, b: TDependencyList) => {
  return !a || a.length !== b.length || b.some((arg, index) => !Object.is(arg, a[index]))
}
