import { TSize, getClassBySize } from '../types';
import { clsx } from '../../../clsx/index';
import { useState, useEffect } from '../../../reactor/index';
import { validateInput } from '../../lib/index';

export type TInput = {
    autofocus?: boolean;
    autocomplete?: string;
    type?: TInputType;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    onInput?: (event: any) => void;
    onChange?: (event: any) => void;
    value?: string;
    size?: TSize;
    minlength?: number;
    maxlength?: number;
    min?: string;
    max?: string;
    validate?: boolean;
    empty?: boolean;
    error?: string;
    setError?: (event: any) => void;
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
    onChange,
    value,
    size,
    minlength,
    maxlength,
    min,
    max,
    validate,
    empty,
    error,
    setError,
}: TInput) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible((passwordVisible) => {
            return !passwordVisible;
        });
    };
    const [isDirty, setDirty] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    useEffect(() => {
        if (setError) {
            const isValid = validateInput(type, currentValue);
            if (!currentValue && isDirty && !empty) {
                setError('Поле не может быть пустым');
            } else if (validate && isDirty && !isValid) {
                setError('Поле некорректно');
            } else {
                setError('');
            }
        }
    }, [currentValue, isDirty]);
    return (
        <div className={clsx('input-container', disabled && 'any--disabled')}>
            {type === 'password' && (
                <span
                    className={clsx(
                        'input__icon',
                        getClassBySize('input__icon', size),
                        passwordVisible ? 'icon-eye' : 'icon-eye-slash',
                    )}
                    onClick={togglePasswordVisibility}
                ></span>
            )}
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
                type={passwordVisible ? 'text' : type}
                name={name}
                placeholder={placeholder}
                autoFocus={autofocus}
                autoComplete={autocomplete}
                disabled={disabled}
                onInput={(event: any) => {
                    if (onInput) onInput(event);
                    setDirty(true);
                    setCurrentValue(event.target.value);
                }}
                onChange={onChange}
                value={value}
                minLength={minlength}
                maxLength={maxlength}
                min={min}
                max={max}
                className={clsx(
                    'input',
                    getClassBySize('input', size),
                    type === 'password' && 'input--password',
                    error && 'input--invalid',
                )}
            />
            <span className={clsx('input__error', !error && 'any--none')}>
                {error}
            </span>
        </div>
    );
};
