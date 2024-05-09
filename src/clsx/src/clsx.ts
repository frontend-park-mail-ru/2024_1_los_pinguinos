export const clsx = (...args: (string | boolean)[]) =>
    args.filter((arg) => typeof arg === 'string').join(' ');
