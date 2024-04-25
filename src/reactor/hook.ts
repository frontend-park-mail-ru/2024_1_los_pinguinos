import { update, isFn, getCurrentFiber } from "./reconcile"
import {
  DependencyList,
  Reducer,
  IFiber,
  Dispatch,
  SetStateAction,
  EffectCallback,
  HookTypes,
  IEffect,
} from "./type"

const EMPTY_ARR = []

let cursor = 0

export const resetCursor = () => {
  cursor = 0
}

export const useState = <T>(initState: T): [T, Dispatch<SetStateAction<T>>] => {
  return useReducer(undefined, initState)
}

export const useReducer = <S, A>(
  reducer?: Reducer<S, A>,
  initState?: S
): [S, Dispatch<A>] => {
  const [hook, current]: [any, IFiber] = getHook<S>(cursor++)
  if (hook.length === 0) {
    hook[0] = initState
    hook[1] = (value: A | Dispatch<A>) => {
      let v = reducer
        ? reducer(hook[0], value as any)
        : isFn(value)
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

export const useEffect = (cb: EffectCallback, deps?: DependencyList): void => {
  return effectImpl(cb, deps!, "effect")
}

const effectImpl = (
  cb: EffectCallback,
  deps: DependencyList,
  key: HookTypes
): void => {
  const [hook, current] = getHook(cursor++)
  if (isChanged(hook[1], deps)) {
    hook[0] = cb
    hook[1] = deps
    current.hooks[key].push(hook)
  }
}

export const getHook = <S = Function | undefined, Dependency = any>(
  cursor: number
): [[S, Dependency], IFiber] => {
  const current: IFiber<any> = getCurrentFiber()
  const hooks =
    current.hooks || (current.hooks = { list: [], effect: [], layout: [] })
  if (cursor >= hooks.list.length) {
    hooks.list.push([] as IEffect)
  }
  return [(hooks.list[cursor] as unknown) as [S, Dependency], current]
}

export const isChanged = (a: DependencyList, b: DependencyList) => {
  return !a || a.length !== b.length || b.some((arg, index) => !Object.is(arg, a[index]))
}
