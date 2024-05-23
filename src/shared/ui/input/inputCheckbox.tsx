import { TSize, getClassBySize } from '../types';
import { clsx } from '../../lib/clsx/index';
import { genId } from '../../lib/common/index';

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
    id?: string | number;
};

/**
 * Renders a checkbox input component with various properties.
 *
 * @function InputCheckbox
 * @param {TInputCheckbox} props - The properties of the checkbox component.
 * @returns {JSX.Element} The rendered checkbox component.
 */
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
    id = genId(),
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
                htmlFor={name || id}
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
                id={id}
            />
        </div>
    );
};
