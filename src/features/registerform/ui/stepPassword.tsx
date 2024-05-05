import { Button, Input } from '../../../shared/ui';
import { IStep, validateInput, updateInputError } from '../../../shared/lib';
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
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [validatedPassword, setValidatedPassword] = useState(false);
    const [stepError, setStepError] = useState('');
    useEffect(() => {
        updateInputError({
            inputType: 'password',
            inputValue: currentPassword,
            isTouched: touchedPassword,
            setTouched: setTouchedPassword,
            isValidated: validatedPassword,
            errorMessageEmpty: 'Поле не может быть пустым',
            errorMessageInvalid: 'Некорректный пароль',
            setErrorMessage: setPasswordError,
            helpMessage: 'password should be cooler',
            setHelpMessage: setStepError,
        });

        return () => {};
    }, [currentPassword, validatedPassword]);
    const allowContinue = (event: any) => {
        const passwordValid = validateInput('password', currentPassword);
        if (passwordValid) {
            if (onNavigateForward) onNavigateForward(event);
            return;
        }
        setValidatedPassword(true);
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
            </div>
            <span className="form__title">Почти закончили</span>
            <span className="form__description">
                Остался последний шаг, введите пароль
            </span>
            <div className="form__input-container">
                {Input({
                    type: 'password',
                    autocomplete: 'new-password',
                    placeholder: 'Ваш password',
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
                })}
                <Button
                    label="Завершить"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                    onClick={allowContinue}
                />
            </div>
            <span className="form__error">{stepError}</span>
        </div>
    );
};
export default StepPassword;
