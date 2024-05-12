import { TSize, getClassBySize } from '../types';
import { clsx } from '../../../clsx/index';
import { genId } from '../../lib/index';

export type TTextArea = {
    autofocus?: boolean;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
    onChange?: (event: any) => void;
    onInput?: (event: any) => void;
    value?: string;
    maxlength?: number;
    size?: TSize;
    error?: string;
    id?: string | number;
};

export const TextArea = ({
    autofocus,
    placeholder,
    label,
    name,
    disabled,
    onChange,
    onInput,
    value,
    maxlength,
    size,
    error,
    id = genId(),
}: TTextArea) => {
    return (
        <div className={clsx('input-container', disabled && 'any--disabled')}>
            <label
                className={clsx(
                    'input__label',
                    getClassBySize('input__label', size),
                    !label && 'any--none',
                )}
                htmlFor={name || id}
            >
                {label}
            </label>
            <textarea
                name={name}
                placeholder={placeholder}
                autoFocus={autofocus}
                disabled={disabled}
                onChange={onChange}
                onInput={onInput}
                value={value}
                maxLength={maxlength}
                className={clsx(
                    'textarea',
                    getClassBySize('input', size),
                    error && 'input--invalid',
                )}
                id={id}
            />
            <span className={clsx('input__error', !error && 'any--none')}>
                {error}
            </span>
        </div>
    );
};
