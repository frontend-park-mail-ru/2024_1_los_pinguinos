import { useState, useEffect } from '../../../reactor/index';
import { Button, ButtonLink, Input } from '../../../shared/ui';
import { Link } from '../../../shared/routing/link';
import {
    validateInput,
    IStep,
    updateInputError,
} from '../../../shared/lib/index';
import { clsx } from '../../../clsx';

interface TEmailStep extends IStep {
    setEmail: (event: any) => void;
    email: string;
}
const StepEmail = ({
    onNavigateForward,
    setEmail,
    email,
    display,
}: TEmailStep) => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [validatedEmail, setValidatedEmail] = useState(false);
    const [stepError, setStepError] = useState('');
    useEffect(() => {
        updateInputError({
            inputType: 'email',
            inputValue: currentEmail,
            isTouched: touchedEmail,
            setTouched: setTouchedEmail,
            isValidated: validatedEmail,
            errorMessageEmpty: 'Поле не может быть пустым',
            errorMessageInvalid: 'Некорректный email',
            setErrorMessage: setEmailError,
            helpMessage: 'email should be cooler',
            setHelpMessage: setStepError,
        });

        return () => {};
    }, [currentEmail, validatedEmail]);
    const allowContinue = () => {
        const emailValid = validateInput('email', currentEmail);
        if (emailValid) {
            if (onNavigateForward) onNavigateForward();
            return;
        }
        setValidatedEmail(true);
    };
    return (
        <div className={clsx('form__step', !display && 'any--none')}>
            <div className="form__header">
                <ButtonLink
                    icon="icon-chevron-left"
                    fontSize="xl"
                    severity="link"
                    back
                />
            </div>
            <span className="form__title">Регистрация</span>
            <div className="form__input-container">
                <Input
                    type="email"
                    autocomplete="email"
                    placeholder="Ваш email"
                    maxlength={320}
                    autofocus
                    onInput={(event: any) => {
                        setCurrentEmail(event.target.value);
                    }}
                    onChange={(event: any) => {
                        setEmail(event.target.value);
                    }}
                    value={email}
                    error={emailError}
                />
                <Button
                    label="Продолжить"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                    onClick={allowContinue}
                />
            </div>
            <span className="form__footer">
                Уже есть аккаунт?
                <Link to="/login" persistent>
                    Войти
                </Link>
            </span>
            <span className="form__error">{stepError}</span>
        </div>
    );
};
export default StepEmail;
