export type TSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'max-width';

export const getClassBySize = (basicClass: string, size: TSize) => {
    switch (size) {
        case 'xxs':
            return `${basicClass}--xxs`;
        case 'xs':
            return `${basicClass}--xs`;
        case 's':
            return `${basicClass}--s`;
        case 'm':
            return `${basicClass}--m`;
        case 'l':
            return `${basicClass}--l`;
        case 'xl':
            return `${basicClass}--xl`;
        case 'xxl':
            return `${basicClass}--xxl`;
        case 'max-width':
            return `${basicClass}--max-width`;
    }
};
