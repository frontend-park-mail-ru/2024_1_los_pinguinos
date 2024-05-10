import { Button, Input } from '../../../shared/ui';
import { IStep, validateInput, updateFormError } from '../../../shared/lib';
import { clsx } from '../../../clsx';
import { useState, useEffect } from '../../../reactor';
interface TPasswordStep extends IStep {
    setPassword: (event: any) => void;
    password: string;
}
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
