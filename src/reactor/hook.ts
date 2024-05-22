import { update, isFunctionalElement, getCurrentFiber } from './reconcile';
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
} from './type';

let cursor = 0;

/**
 * Resets the cursor to 0. Used to reset the hook state index.
 *
 * @function resetCursor
 */
export const resetCursor = () => {
    cursor = 0;
};

/**
 * Hook to manage state in functional components.
 *
 * @function useState
 * @template T - The type of the state.
 * @param {T} initState - The initial state.
 * @returns {[T, TDispatch<TSetStateAction<T>>]} The current state and a function to update it.
 */
export const useState = <T>(
    initState: T,
): [T, TDispatch<TSetStateAction<T>>] => {
    return useReducer(undefined, initState);
};

/**
 * Hook to manage state with a reducer in functional components.
 *
 * @function useReducer
 * @template State - The type of the state.
 * @template Action - The type of the action.
 * @param {TReducer<State, Action>} [reducer] - The reducer function.
 * @param {State} [initState] - The initial state.
 * @returns {[State, TDispatch<Action>]} The current state and a function to dispatch actions.
 */
export const useReducer = <State, Action>(
    reducer?: TReducer<State, Action>,
    initState?: State,
): [State, TDispatch<Action>] => {
    const [hook, current]: [any, IFiber] = getHook<State>(cursor++);
    if (hook.length === 0) {
        hook[0] = initState;
        hook[1] = (value: Action | TDispatch<Action>) => {
            let v = reducer
                ? reducer(hook[0], value as any)
                : isFunctionalElement(value)
                ? value(hook[0])
                : value;
            if (hook[0] !== v) {
                hook[0] = v;
                update(current);
            }
        };
    }
    return hook;
};

/**
 * Hook to perform side effects in functional components.
 *
 * @function useEffect
 * @param {TEffectCallback} cb - The callback function to run the effect.
 * @param {TDependencyList} [deps] - The dependency list for the effect.
 */
export const useEffect = (
    cb: TEffectCallback,
    deps?: TDependencyList,
): void => {
    return effectImpl(cb, deps!, 'effect');
};

/**
 * Internal implementation for effect hooks.
 *
 * @function effectImpl
 * @param {TEffectCallback} cb - The callback function to run the effect.
 * @param {TDependencyList} deps - The dependency list for the effect.
 * @param {THooks} key - The key to store the effect in the hooks list.
 */
const effectImpl = (
    cb: TEffectCallback,
    deps: TDependencyList,
    key: THooks,
): void => {
    const [hook, current] = getHook(cursor++);
    if (isChanged(hook[1], deps)) {
        hook[0] = cb;
        hook[1] = deps;
        current.hooks[key].push(hook);
    }
};

/**
 * Retrieves the current hook state and the fiber it belongs to.
 *
 * @function getHook
 * @template State - The type of the state.
 * @template Dependency - The type of the dependency.
 * @param {number} cursor - The index of the current hook.
 * @returns {[[State, Dependency], IFiber]} The hook state and the current fiber.
 */
export const getHook = <State = Function | undefined, Dependency = any>(
    cursor: number,
): [[State, Dependency], IFiber] => {
    const current: IFiber<any> = getCurrentFiber();
    const hooks = current.hooks || (current.hooks = { list: [], effect: [] });
    if (cursor >= hooks.list.length) {
        hooks.list.push([] as TEffect);
    }
    return [hooks.list[cursor] as unknown as [State, Dependency], current];
};

/**
 * Determines if the dependency list has changed.
 *
 * @function isChanged
 * @param {TDependencyList} oldDepList - The old dependency list.
 * @param {TDependencyList} newDepList - The new dependency list.
 * @returns {boolean} True if the dependency list has changed, false otherwise.
 */
export const isChanged = (
    oldDepList: TDependencyList,
    newDepList: TDependencyList,
) => {
    return (
        !oldDepList ||
        oldDepList.length !== newDepList.length ||
        newDepList.some((arg, index) => !Object.is(arg, oldDepList[index]))
    );
};
