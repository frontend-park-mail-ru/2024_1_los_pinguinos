import { clsx } from '../../../clsx/index';

export type TButton = {
    severity?: TSeverity;
    label?: string;
    icon?: string;
    type?: TButtonType;
    size?: TSize;
    fontSize?: TSize;
    onClick?: (event: any) => void;
    disabled?: boolean;
};
export type TButtonType = 'button' | 'submit' | 'reset';
export type TSeverity = 'danger' | 'success' | 'info';
export type TSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export const getClassBySeverity = (sev: TSeverity) => {
    switch (sev) {
        case 'danger':
            return 'button--danger';
        case 'success':
            return 'button--success';
        case 'info':
            return 'button--info';
    }
};
export const getClassBySize = (size: TSize) => {
    switch (size) {
        case 'xxs':
            return 'button--xxs';
        case 'xs':
            return 'button--xs';
        case 's':
            return 'button--s';
        case 'm':
            return 'button--m';
        case 'l':
            return 'button--l';
        case 'xl':
            return 'button--xl';
        case 'xxl':
            return 'button--xxl';
    }
};
export const getClassByFontSize = (size: TSize) => {
    switch (size) {
        case 'xxs':
            return 'button__label--xxs';
        case 'xs':
            return 'button__label--xs';
        case 's':
            return 'button__label--s';
        case 'm':
            return 'button__label--m';
        case 'l':
            return 'button__label--l';
        case 'xl':
            return 'button__label--xl';
        case 'xxl':
            return 'button__label--xxl';
    }
};

export const Button = ({
    label,
    icon,
    type = 'button',
    onClick,
    severity,
    size,
    fontSize,
    disabled,
}: TButton) => {
    return (
        <button
            type={type}
            onClick={disabled ? null : onClick}
            className={clsx(
                'button',
                getClassBySeverity(severity),
                getClassBySize(size),
                disabled && 'button--disabled',
            )}
        >
            <span
                className={clsx(
                    'button__label',
                    getClassByFontSize(fontSize),
                    icon,
                    !icon && 'any--none',
                    disabled && 'button__label--disabled',
                )}
            ></span>
            <span
                className={clsx(
                    'button__label',
                    getClassByFontSize(fontSize),
                    disabled && 'button__label--disabled',
                )}
            >
                {label}
            </span>
        </button>
    );
};
