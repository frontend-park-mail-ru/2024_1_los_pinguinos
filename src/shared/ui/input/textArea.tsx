import { TSize, getClassBySize } from '../types';
import { clsx } from '../../../clsx/index';

export type TTextArea = {
    autofocus?: boolean;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    onChange?: (event: any) => void;
    value?: string;
    maxlength?: number;
    size?: TSize;
    error?: string;
};

export const TextArea = ({
    autofocus,
    placeholder,
    label,
    name,
    disabled,
    onChange,
    value,
    maxlength,
    size,
    error,
}: TTextArea) => {
    return (
        <div className={clsx('input-container', disabled && 'any--disabled')}>
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
            <textarea
                name={name}
                placeholder={placeholder}
                autoFocus={autofocus}
                disabled={disabled}
                onChange={onChange}
                value={value}
                maxLength={maxlength}
                className={clsx(
                    'textarea',
                    getClassBySize('input', size),
                    error && 'input--invalid',
                )}
            />
            <span className={clsx('input__error', !error && 'any--none')}>
                {error}
            </span>
        </div>
    );
};
