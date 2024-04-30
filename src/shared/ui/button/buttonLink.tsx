import { Button, TButton } from './button';
export interface TButtonLink extends TButton {
    to?: string;
    persistent?: boolean;
    back?: boolean;
}

export const ButtonLink = ({
    label,
    icon,
    type = 'button',
    onClick,
    severity,
    size,
    fontSize,
    disabled,
    to,
    persistent,
    back,
}: TButtonLink) => {
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
    onClick = handleClick;
    return Button({
        label,
        icon,
        type,
        onClick,
        severity,
        size,
        fontSize,
        disabled,
    });
};
