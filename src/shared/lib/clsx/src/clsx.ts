/**
 * Combines multiple class names into a single string.
 *
 * @function clsx
 * @param {...(string | boolean)[]} args - The class names or boolean values.
 * @returns {string} The combined class names.
 */
export const clsx = (...args: (string | boolean)[]) =>
    args.filter((arg) => typeof arg === 'string').join(' ');
