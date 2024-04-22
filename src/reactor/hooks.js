import reactive from './reactive';
import { depsAltered } from './util';

export const cancelEffects = (fiber) => {
    if (fiber.hooks) {
        fiber.hooks
            .filter((hook) => hook.tag === 'effect' && hook.cancel)
            .forEach((effectHook) => {
                effectHook.cancel();
            });
    }
};

export const runEffects = (fiber) => {
    if (fiber.hooks) {
        fiber.hooks
            .filter((hook) => hook.tag === 'effect' && hook.effect)
            .forEach((effectHook) => {
                effectHook.cancel = effectHook.effect();
            });
    }
};

export const useState = (initial) => {
    const activeFiber = reactive.getActiveFiber();
    const hookIndex = reactive.getHookIndex();
    const oldHook =
        activeFiber.alternate &&
        activeFiber.alternate.hooks &&
        activeFiber.alternate.hooks[hookIndex];
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: [],
    };

    const actions = oldHook ? oldHook.queue : [];
    actions.forEach((action) => {
        hook.state = action(hook.state);
    });

    const setState = (action) => {
        hook.queue.push(action);
        const currentRoot = reactive.getCurrentRoot();
        const wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        };
        reactive.setActiveRoot(wipRoot);
        reactive.setNextUnitOfWork(wipRoot);
        const deletions = [];
        reactive.setDeletions(deletions);
    };

    activeFiber.hooks.push(hook);
    reactive.setHookIndex(hookIndex + 1);

    return [hook.state, setState];
};

export const useEffect = (effect, deps) => {
    const activeFiber = reactive.getActiveFiber();
    const hookIndex = reactive.getHookIndex();
    const oldHook =
        activeFiber.alternate &&
        activeFiber.alternate.hooks &&
        activeFiber.alternate.hooks[hookIndex];

    const hasChanged = depsAltered(oldHook ? oldHook.deps : undefined, deps);

    const hook = {
        tag: 'effect',
        effect: hasChanged ? effect : null,
        cancel: hasChanged && oldHook && oldHook.cancel,
        deps,
    };

    activeFiber.hooks.push(hook);
    reactive.setHookIndex(hookIndex + 1);
};
