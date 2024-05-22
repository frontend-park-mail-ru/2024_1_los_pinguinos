import { isText } from './reconcile';
import { IFunctionalComponent, TElement, TNode, TText } from './type';

/**
 * Converts a value to an array if it is not already an array.
 *
 * @function arrayfy
 * @param {boolean | TText | TElement<any, string> | TNode[] | null | undefined} arr - The value to convert.
 * @returns {TNode[]} The converted array.
 */
export const arrayfy = (
    arr: boolean | TText | TElement<any, string> | TNode[] | null | undefined,
) => (!arr ? [] : isArr(arr) ? arr : [arr]);

/**
 * Creates a virtual DOM element.
 *
 * @function createElement
 * @param {any} type - The type of the element.
 * @param {any} props - The properties of the element.
 * @param {...any[]} children - The children of the element.
 * @returns {TElement} The created virtual DOM element.
 */
export const createElement = (type: any, props: any, ...children: any[]) => {
    props = props || {};
    children = flat(arrayfy(props.children || children));

    if (children.length)
        props.children = children.length === 1 ? children[0] : children;

    const key = props.key || null;
    const ref = props.ref || null;

    if (key) props.key = undefined;
    if (ref) props.ref = undefined;

    return createVnode(type, props, key, ref);
};

/**
 * Flattens an array.
 *
 * @function flat
 * @param {any[]} array - The array to flatten.
 * @returns {any[]} The flattened array.
 */
const flat = (array: any[]) => {
    const flattenedArray = array.flat(Infinity);

    return flattenedArray.reduce((acc, item) => {
        if (item !== null && typeof item !== 'boolean') {
            acc.push(isText(item) ? createText(item) : item);
        }
        return acc;
    }, []);
};

/**
 * Creates a virtual node.
 *
 * @function createVnode
 * @param {any} type - The type of the node.
 * @param {any} props - The properties of the node.
 * @param {any} key - The key of the node.
 * @param {any} ref - The reference of the node.
 * @returns {TElement} The created virtual node.
 */
export const createVnode = (type: any, props: any, key: any, ref: any) => ({
    type,
    props,
    key,
    ref,
});

/**
 * Creates a text virtual node.
 *
 * @function createText
 * @param {any} vnode - The text content.
 * @returns {TElement} The created text virtual node.
 */
export const createText = (vnode: any) =>
    ({ type: '#text', props: { nodeValue: vnode + '' } } as TElement);

/**
 * Fragment component that returns its children.
 *
 * @function Fragment
 * @param {Object} props - The properties of the fragment.
 * @param {any} props.children - The children of the fragment.
 * @returns {any} The children of the fragment.
 */
export function Fragment(props: { children: any }) {
    return props.children;
}

/**
 * Memoizes a functional component.
 *
 * @function memo
 * @template T - The type of the component props.
 * @param {IFunctionalComponent<T>} func - The functional component to memoize.
 * @param {IFunctionalComponent<T>['shouldUpdate']} [compare] - The function to compare props.
 * @returns {IFunctionalComponent<T>} The memoized functional component.
 */
export function memo<T extends object>(
    func: IFunctionalComponent<T>,
    compare?: IFunctionalComponent<T>['shouldUpdate'],
) {
    func.memo = true;
    func.shouldUpdate = compare;
    return func;
}

/**
 * Checks if a value is an array.
 *
 * @function isArr
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is an array, false otherwise.
 */
export const isArr = Array.isArray;
