export const isEvent = (key) => key.startsWith('on');

export const isProperty = (key) => key !== 'children' && !isEvent(key);

export const isCreated = (prev, next) => (key) => prev[key] !== next[key];

export const isDeleted = (prev, next) => (key) => !(key in next);

export const depsAltered = (prevDeps, nextDeps) =>
    !prevDeps ||
    !nextDeps ||
    prevDeps.length !== nextDeps.length ||
    prevDeps.some((dep, index) => dep !== nextDeps[index]);

const createTextElement = (text) => {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    };
};

export const createElement = (type, props, ...children) => {
    const processedChildren = children.map((child) => {
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
            children: processedChildren.flat(),
        },
    };
};

export const clsx = (...args) =>
    args.filter((arg) => typeof arg === 'string').join(' ');
