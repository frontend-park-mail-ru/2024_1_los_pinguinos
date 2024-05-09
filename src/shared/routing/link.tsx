import { clsx } from '../../clsx/index';

export interface ILink {
    to: string;
    children?: any;
    persistent?: boolean;
    back?: boolean;
    className?: string;
}
export const Link = ({ to, children, persistent, back, className }: ILink) => {
    const handleClick = (event: any) => {
        event.preventDefault();
        if (back) {
            history.back();
        } else if (persistent) {
            history.replaceState(null, '', to);
        } else {
            history.pushState(null, '', to);
        }
        window.dispatchEvent(new Event('popstate'));
    };

    return (
        <a
            className={className ? className : 'link'}
            style="display: flex; align-items:center; gap: 10px"
            href={to}
            onClick={handleClick}
        >
            {children}
        </a>
    );
};
