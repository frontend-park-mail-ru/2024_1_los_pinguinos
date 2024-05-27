import { clsx } from '../../lib/clsx/index';
import { TSize, getClassBySize, getClassByColor, TColor } from '../types';
import './index.css';
import '../icons/index.css'

export type TButton = {
    severity?: TSeverity;
    label?: string;
    icon?: string;
    type?: TButtonType;
    size?: TSize;
    fontSize?: TSize;
    onClick?: (event: any) => void;
    disabled?: boolean;
    round?: boolean;
    fontColor?: TColor;
    dataAfterText?: string;
    dataAfterType?: string;
};
export type TButtonType = 'button' | 'submit' | 'reset';
export type TSeverity =
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'link'
    | 'critical'
    | 'edit'
    | 'cancel'
    | 'contrast'
    | 'fill'
    | 'outline';

/**
 * A Button component that renders a styled button with optional severity, size, font size, icon, and label.
 *
 * @function Button
 * @param {TButton} props - The properties of the button component.
 * @returns {JSX.Element} The rendered button component.
 */
export const Button = ({
    label,
    icon,
    type = 'button',
    onClick,
    severity,
    size,
    fontSize,
    disabled,
    round,
    fontColor,
    dataAfterText,
    dataAfterType,
}: TButton) => {
    const getClassBySeverity = (sev: TSeverity) => {
        switch (sev) {
            case 'danger':
                return 'button--danger';
            case 'warning':
                return 'button--warning';
            case 'success':
                return 'button--success';
            case 'info':
                return 'button--info';
            case 'link':
                return 'button--link';
            case 'critical':
                return 'button--critical';
            case 'contrast':
                return 'button--contrast';
            case 'cancel':
                return 'button--cancel';
            case 'edit':
                return 'button--edit';
            case 'fill':
                return 'button--fill';
            case 'outline':
                return 'button--outline';
        }
    };
    return (
        <button
            type={type}
            data-after-text={dataAfterText}
            data-after-type={dataAfterType}
            onClick={disabled ? null : onClick}
            className={clsx(
                'button',
                getClassBySeverity(severity),
                getClassBySize('button', size),
                round && 'button--round',
                disabled && 'any--disabled',
            )}
        >
            <span
                className={clsx(
                    'button__label',
                    getClassBySize('button__label', fontSize),
                    getClassByColor('button__label', fontColor),
                    icon,
                    !icon && 'any--none',
                )}
            ></span>
            <span
                className={clsx(
                    'button__label',
                    getClassBySize('button__label', fontSize),
                    !label && 'any--none',
                    getClassByColor('button__label', fontColor),
                )}
            >
                {label}
            </span>
        </button>
    );
};
