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
    onChange?: (event: any) => void;
    value?: string;
    size?: TSize;
    minlength?: number;
    maxlength?: number;
    icon?: string;
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
    onChange,
    value,
    size,
    minlength,
    maxlength,
    icon,
}: TInput) => {
    const [currentType, setCurrentType] = useState(type);
    const [currentIcon, setCurrentIcon] = useState(icon);
    return (
        <div class="input-container">
            <span
                // className={clsx(
                //     'input__icon',
                //     getClassBySize('input__icon', size),
                //     currentIcon,
                //     !currentIcon && 'any--none',
                // )}
                className={`input__icon input__icon--m ${currentIcon}`}
                onClick={() => {
                    setCurrentType((currentType) => {
                        return currentType === 'text' ? 'password' : 'text';
                    });
                    setCurrentIcon((currentIcon) => {
                        return currentIcon === 'icon-eye-slash'
                            ? 'icon-eye'
                            : 'icon-eye-slash';
                    });
                    console.log('sdadas');
                }}
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
                onChange={onChange}
                value={value}
                minLength={minlength}
                maxLength={maxlength}
                className={clsx(
                    'input',
                    getClassBySize('input', size),
                    disabled && 'any--disabled',
                )}
            />
        </div>
    );
};
