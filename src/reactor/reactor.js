import { isEvent, isDeleted, isCreated, isProperty } from './util';
import { runEffects, cancelEffects } from './hooks';
import reactive from './reactive';

const createDom = (fiber) => {
    const dom =
        fiber.type == 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);

    return dom;
};

const updateDom = (dom, prevProps, nextProps) => {
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(
            (key) =>
                !(key in nextProps) || isCreated(prevProps, nextProps)(key),
        )
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isDeleted(prevProps, nextProps))
        .forEach((name) => {
            dom[name] = '';
        });

    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isCreated(prevProps, nextProps))
        .forEach((name) => {
            dom[name] = nextProps[name];
        });

    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isCreated(prevProps, nextProps))
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
};

const commitRoot = () => {
    const deletions = reactive.getDeletions();
    deletions.forEach(commitWork);
    const wipRoot = reactive.getActiveRoot();
    commitWork(wipRoot.child);
    reactive.setCurrentRoot(wipRoot);
    reactive.setActiveRoot(null);
};

const commitWork = (fiber) => {
    if (!fiber) {
        return;
    }

    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === 'PLACEMENT') {
        if (fiber.dom != null) {
            domParent.appendChild(fiber.dom);
        }
        runEffects(fiber);
    } else if (fiber.effectTag === 'UPDATE') {
        cancelEffects(fiber);
        if (fiber.dom != null) {
            updateDom(fiber.dom, fiber.alternate.props, fiber.props);
        }
        runEffects(fiber);
    } else if (fiber.effectTag === 'DELETION') {
        cancelEffects(fiber);
        commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
};

const commitDeletion = (fiber, domParent) => {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent);
    }
};

const performUnitOfWork = (fiber) => {
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
};

const updateFunctionComponent = (fiber) => {
    reactive.setActiveFiber(fiber);
    const activeFiber = reactive.getActiveFiber();
    reactive.setHookIndex(0);
    activeFiber.hooks = [];
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
};

const updateHostComponent = (fiber) => {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children);
};

const reconcileChildren = (activeFiber, elements) => {
    let index = 0;
    let oldFiber = activeFiber.alternate && activeFiber.alternate.child;
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
                parent: activeFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
            };
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: activeFiber,
                alternate: null,
                effectTag: 'PLACEMENT',
            };
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION';
            const deletions = reactive.getDeletions();
            deletions.push(oldFiber);
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if (index === 0) {
            activeFiber.child = newFiber;
        } else if (element) {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
        index++;
    }
};

export const render = (element, container) => {
    const wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
        alternate: reactive.getCurrentRoot(),
    };
    reactive.setActiveRoot(wipRoot);
    const deletions = [];
    reactive.setDeletions(deletions);
    reactive.setNextUnitOfWork(wipRoot);
};

export const workLoop = (deadline) => {
    let shouldYield = false;
    while (reactive.getNextUnitOfWork() && !shouldYield) {
        reactive.setNextUnitOfWork(
            performUnitOfWork(reactive.getNextUnitOfWork()),
        );
        shouldYield = deadline.timeRemaining() < 1;
    }

    if (!reactive.getNextUnitOfWork() && reactive.getActiveRoot()) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
};
