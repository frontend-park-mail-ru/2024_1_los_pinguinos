export const clsx = (...args: string[]) =>
  args.filter((arg) => typeof arg === 'string').join(' ');