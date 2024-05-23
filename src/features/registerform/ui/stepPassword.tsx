import { Button, Input } from '../../../shared/ui';
import { updateFormError } from '../../../shared/lib/common';
import { clsx } from '../../../shared/lib/clsx';
import { useState, useEffect } from '../../../reactor';
import { IStep, validateInput } from '../../../shared/lib/input';

interface TPasswordStep extends IStep {
    setPassword: (event: any) => void;
    password: string;
}

/**
 * A StepPassword component that renders the step for entering the user's password.
 *
 * @function StepPassword
 * @param {TPasswordStep} props - The properties of the step password component.
 * @returns {JSX.Element} The rendered step password component.
 */
const StepPassword = ({
    onNavigateForward,
    onNavigateBack,
    setPassword,
    password,
    display,
}: TPasswordStep) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [stepError, setStepError] = useState('');
    useEffect(() => {
        updateFormError({
            type: 'password',
            value: currentPassword,
            error: passwordError,
            setError: setStepError,
            errorMessage:
                'Пароль должен быть длиной от 8 до 32 символов. Разрешенны стандартные спец. символы',
        });

        return () => {};
    }, [passwordError]);
    const allowContinue = (event: any) => {
        const passwordValid = validateInput('password', currentPassword);
        if (!password && !passwordError)
            setPasswordError('Поле не может быть пустым');
        if (passwordValid) {
            if (onNavigateForward) onNavigateForward(event);
            return;
        }
    };

    return (
        <div className={clsx('form__step', !display && 'any--none')}>
            <div className="form__header">
                <Button
                    icon="icon-chevron-left"
                    fontSize="xl"
                    severity="link"
                    onClick={onNavigateBack}
                />
                <span className="form__description step__counter">3/3</span>
            </div>
            <span className="form__title">Почти закончили</span>
            <span className="form__description">
                Остался последний шаг, введите пароль
            </span>
            <div className="form__input-container">
                {Input({
                    type: 'password',
                    autocomplete: 'new-password',
                    placeholder: 'Ваш пароль',
                    maxlength: 32,
                    autofocus: true,
                    onInput: (event: any) => {
                        setCurrentPassword(event.target.value);
                    },
                    onChange: (event: any) => {
                        setPassword(event.target.value);
                    },
                    value: password,
                    error: passwordError,
                    setError: setPasswordError,
                    validate: true,
                })}
                <Button
                    label="Завершить"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                    onClick={allowContinue}
                />
            </div>
            <span className={clsx(!stepError && 'any--none', 'form__error')}>
                {stepError}
            </span>
        </div>
    );
};
export default StepPassword;
