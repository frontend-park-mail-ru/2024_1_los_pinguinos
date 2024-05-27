import { Button, TButton } from './button';
export interface TButtonLink extends TButton {
    to?: string;
    persistent?: boolean;
    back?: boolean;
}

/**
 * A ButtonLink component that renders a button and handles navigation.
 *
 * @function ButtonLink
 * @param {TButtonLink} props - The properties of the button link component.
 * @returns {JSX.Element} The rendered button link component.
 */
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
    dataAfterText,
    dataAfterType,
}: TButtonLink) => {
    /**
     * Handles the click event and navigates accordingly.
     *
     * @function handleClick
     * @param {any} event - The click event.
     */
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

    /**
     * Handles the click event and invokes the onClick handler if provided.
     *
     * @function onClickLink
     * @param {any} event - The click event.
     */
    const onClickLink = (event: any) => {
        if (onClick) onClick(event);
        handleClick(event);
    };
    return Button({
        label,
        icon,
        type,
        onClick: onClickLink,
        severity,
        size,
        fontSize,
        disabled,
        dataAfterText,
        dataAfterType,
    });
};
