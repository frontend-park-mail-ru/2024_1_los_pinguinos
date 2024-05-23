import { useState, useEffect } from '../../../reactor/index';
import { Button, ButtonLink, Input } from '../../../shared/ui';
import { Link } from '../../../shared/ui/link';
import {
    updateFormError,
} from '../../../shared/lib/common/index';
import { IStep, validateInput } from '../../../shared/lib/input';
import { clsx } from '../../../shared/lib/clsx';

interface TEmailStep extends IStep {
    setEmail: (event: any) => void;
    email: string;
}

/**
 * A StepEmail component that renders the step for entering the user's email.
 *
 * @function StepEmail
 * @param {TEmailStep} props - The properties of the step email component.
 * @returns {JSX.Element} The rendered step email component.
 */
const StepEmail = ({
    onNavigateForward,
    setEmail,
    email,
    display,
}: TEmailStep) => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [stepError, setStepError] = useState('');
    useEffect(() => {
        updateFormError({
            type: 'email',
            value: currentEmail,
            error: emailError,
            setError: setStepError,
            errorMessage: 'Введите email в формате mail@domain.ru',
        });
    }, [emailError]);
    const allowContinue = () => {
        setStepError('');
        const isValidEmail = validateInput('email', currentEmail);
        if (!emailError && isValidEmail) {
            if (onNavigateForward) onNavigateForward();
            return;
        } else {
            if (currentEmail) {
                setEmailError('Поле некорректно');
            } else {
                setEmailError('Поле не может быть пустым');
            }
        }
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
                    validate
                    error={emailError}
                    setError={setEmailError}
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
            <span className={clsx(!stepError && 'any--none', 'form__error')}>
                {stepError}
            </span>
        </div>
    );
};
export default StepEmail;
