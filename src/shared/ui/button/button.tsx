import { clsx } from '../../../clsx/index';
import { TSize, getClassBySize } from '../types';

export type TButton = {
    severity?: TSeverity;
    label?: string;
    icon?: string;
    type?: TButtonType;
    size?: TSize;
    fontSize?: TSize;
    onClick?: (event: any) => void;
    disabled?: boolean;
    navbar?: boolean;
};
export type TButtonType = 'button' | 'submit' | 'reset';
export type TSeverity =
    | 'danger'
    | 'success'
    | 'info'
    | 'link'
    | 'contrast'
    | 'edit'
    | 'cancel';

export const Button = ({
    label,
    icon,
    type = 'button',
    onClick,
    severity,
    size,
    fontSize,
    disabled,
    navbar,
}: TButton) => {
    const getClassBySeverity = (sev: TSeverity) => {
        switch (sev) {
            case 'danger':
                return 'button--danger';
            case 'success':
                return 'button--success';
            case 'info':
                return 'button--info';
            case 'link':
                return 'button--link';
            case 'contrast':
                return 'button--contrast';
            case 'cancel':
                return 'button--cancel';
            case 'edit':
                return 'button--edit';
        }
    };
    return (
        <button
            type={type}
            onClick={disabled ? null : onClick}
            className={clsx(
                'button',
                getClassBySeverity(severity),
                navbar && 'navbar__button',
                getClassBySize('button', size),
                disabled && 'any--disabled',
            )}
        >
            <span
                className={clsx(
                    'button__label',
                    navbar && 'navbar__icon',
                    getClassBySize('button__label', fontSize),
                    icon,
                    !icon && 'any--none',
                )}
            ></span>
            <span
                className={clsx(
                    'button__label',
                    navbar && 'navbar__label',
                    getClassBySize('button__label', fontSize),
                )}
            >
                {label}
            </span>
        </button>
    );
};
