import { TSize, getClassBySize } from '../types';
import { clsx } from '../../../clsx/index';
import { useState } from '../../../reactor/index';

export type TInput = {
    autofocus?: boolean;
    autocomplete?: string;
    type?: TInputType;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    onInput?: (event: any) => void;
    value?: string;
    size?: TSize;
    minlength?: number;
    maxlength?: number;
    error?: string;
};

export type TInputType =
    | 'text'
    | 'password'
    | 'email'
    | 'date'
    | 'checkbox'
    | 'file'
    | 'number'
    | 'hidden';

export const Input = ({
    autofocus,
    autocomplete,
    type = 'text',
    placeholder,
    label,
    name,
    disabled,
    onInput,
    value,
    size,
    minlength,
    maxlength,
    error,
}: TInput) => {
    const [currentType, setCurrentType] = useState(type);
    const [currentIcon, setCurrentIcon] = useState(
        type === 'password' ? 'icon-eye-slash' : null,
    );
    const togglePasswordVisibility = () => {
        setCurrentType((currentType) =>
            currentType === 'text' ? 'password' : 'text',
        );
        setCurrentIcon((currentIcon) =>
            currentIcon === 'icon-eye-slash' ? 'icon-eye' : 'icon-eye-slash',
        );
    };
    return (
        <div className={clsx('input-container', disabled && 'any--disabled')}>
            <span
                className={clsx(
                    'input__icon',
                    getClassBySize('input__icon', size),
                    currentIcon,
                    !currentIcon && 'any--none',
                )}
                onClick={togglePasswordVisibility}
            ></span>
            <label
                className={clsx(
                    'input__label',
                    getClassBySize('input__label', size),
                    !label && 'any--none',
                )}
                htmlFor={name}
            >
                {label}
            </label>
            <input
                type={currentType}
                name={name}
                placeholder={placeholder}
                autoFocus={autofocus}
                autoComplete={autocomplete}
                disabled={disabled}
                onInput={onInput}
                value={value}
                minLength={minlength}
                maxLength={maxlength}
                className={clsx(
                    'input',
                    getClassBySize('input', size),
                    currentIcon && 'input--password',
                    error && 'input--invalid',
                )}
            />
            <span className={clsx('input__error', !error && 'any--none')}>
                {error}
            </span>
        </div>
    );
};
