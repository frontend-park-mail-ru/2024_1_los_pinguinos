function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

export function createElement(type, props, ...children) {
    const processedChildren = children.map((child) => {
        // Если дочерний элемент является массивом, рекурсивно вызываем createElement для каждого его элемента
        if (Array.isArray(child)) {
            return child.map((item) =>
                typeof item === 'object' ? item : createTextElement(item),
            );
        }

        return typeof child === 'object' ? child : createTextElement(child);
    });

    return {
        type,
        props: {
            ...props,
            children: processedChildren.flat(), // "flat" используется для слияния вложенных массивов
        },
    };
}

function createDom(fiber) {
    const dom =
        fiber.type == 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);

    return dom;
}

const isEvent = (key) => key.startsWith('on');
const isProperty = (key) => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
function updateDom(dom, prevProps, nextProps) {
    //Remove old or changed event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(
            (key) => !(key in nextProps) || isNew(prevProps, nextProps)(key),
        )
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

    // Remove old properties
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach((name) => {
            dom[name] = '';
        });

    // Set new or changed properties
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => {
            dom[name] = nextProps[name];
        });

    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
}

function commitRoot() {
    deletions.forEach(commitWork); // Commit all deletions
    commitWork(wipRoot.child); // Recursively commit all DOM updates
    commitEffects(wipRoot); // Commit all effects after the DOM updates
    currentRoot = wipRoot; // Update current root
    wipRoot = null; // Clear the work in progress root
}

function commitWork(fiber) {
    if (!fiber) {
        return;
    }

    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent);
    }
    if (fiber.hooks) {
        fiber.hooks
            .filter((hook) => hook.tag === 'effect' && hook.cleanup)
            .forEach((hook) => {
                hook.cleanup(); // Cleanup on deletion
            });
    }
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
        alternate: currentRoot,
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;
    if (isFunctionComponent) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber);
    }
    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}

let wipFiber = null;
let hookIndex = null;

function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}

function useState(initial) {
    const oldHook =
        wipFiber.alternate &&
        wipFiber.alternate.hooks &&
        wipFiber.alternate.hooks[hookIndex];
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
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        };
        nextUnitOfWork = wipRoot;
        deletions = [];
    };

    wipFiber.hooks.push(hook);
    hookIndex++;

    return [hook.state, setState];
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber = null;

        const sameType = oldFiber && element && element.type == oldFiber.type;

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
            };
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: 'PLACEMENT',
            };
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if (index === 0) {
            wipFiber.child = newFiber;
        } else if (element) {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
        index++;
    }
}

export const Didact = {
    createElement,
    render,
    useState,
};

export function useEffect(effect, deps) {
    const oldHook =
        wipFiber.alternate &&
        wipFiber.alternate.hooks &&
        wipFiber.alternate.hooks[hookIndex];
    const hook = {
        tag: 'effect',
        effect,
        deps,
        cleanup: oldHook ? oldHook.cleanup : undefined,
    };

    if (oldHook) {
        const depsChanged =
            !deps ||
            !oldHook.deps ||
            deps.some((dep, i) => dep !== oldHook.deps[i]);
        if (!depsChanged && oldHook.cleanup) {
            hook.effect = null; // Prevent running the effect if dependencies haven't changed
        }
    }

    wipFiber.hooks = wipFiber.hooks || [];
    wipFiber.hooks.push(hook);
    hookIndex++;
}

// function commitEffects(fiber) {
//     if (!fiber) {
//         return;
//     }
//     const effectHooks = fiber.hooks.filter((hook) => hook.tag === 'effect');
//     effectHooks.forEach((effectHook) => {
//         if (effectHook.cleanup) {
//             effectHook.cleanup(); // Call the cleanup function if it exists
//         }
//         if (effectHook.effect) {
//             effectHook.cleanup = effectHook.effect(); // Execute the effect and store the cleanup function
//         }
//     });

//     commitEffects(fiber.child);
//     commitEffects(fiber.sibling);
// }

function commitEffects(fiber) {
    if (!fiber) return;

    if (fiber.hooks) {
        fiber.hooks.forEach((hook) => {
            if (hook.tag === 'effect' && hook.effect) {
                if (hook.cleanup) {
                    hook.cleanup(); // Call the cleanup function from the previous effect
                }
                hook.cleanup = hook.effect(); // Execute the effect and store the cleanup function
            }
        });
    }

    commitEffects(fiber.child);
    commitEffects(fiber.sibling);
}

// export function clsx() {
//     let i = 0,
//         tmp,
//         str = '',
//         len = arguments.length;
//     for (; i < len; i++) {
//         if ((tmp = arguments[i])) {
//             if (typeof tmp === 'string') {
//                 str += (str && ' ') + tmp;
//             }
//         }
//     }
//     return str;
// }
