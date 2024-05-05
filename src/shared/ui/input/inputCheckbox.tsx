import { TSize, getClassBySize } from '../types';
import { clsx } from '../../../clsx/index';

export type TInputCheckbox = {
    key?: number;
    autofocus?: boolean;
    label?: string;
    name?: string;
    disabled?: boolean;
    onChange?: (event: any) => void;
    value?: string;
    size?: TSize;
    round?: boolean;
    checked?: boolean;
};

export const InputCheckbox = ({
    autofocus,
    label,
    name,
    disabled,
    onChange,
    value,
    size,
    round,
    checked,
}: TInputCheckbox) => {
    return (
        <div
            className={clsx(
                'checkbox-container',
                checked && 'checkbox--checked',
                round && 'checkbox--round',
                disabled && 'any--disabled',
            )}
        >
            <label
                className={clsx(
                    'checkbox__label',
                    getClassBySize('input__label', size),
                    !label && 'any--none',
                )}
                htmlFor={name}
            >
                {label}
            </label>
            <input
                type="checkbox"
                name={name}
                autoFocus={autofocus}
                disabled={disabled}
                onChange={onChange}
                value={value}
                className={clsx(getClassBySize('input', size), 'checkbox')}
                checked={checked}
            />
        </div>
    );
};
