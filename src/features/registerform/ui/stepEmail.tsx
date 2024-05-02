import { useState, useEffect } from '../../../reactor/index';
import { Input } from '../../../shared/ui/input/input';
import { Button } from '../../../shared/ui/button/button';
import { ButtonLink } from '../../../shared/ui/button/buttonLink';
import { Link } from '../../../shared/routing/link';
import { validateInput } from '../../../shared/lib/index';
export type TStep = {
    onNavigateBack?: (event: any) => void;
    onNavigateForward?: Function;
};
interface TEmailStep extends TStep {
    setEmail: (event: any) => void;
    email: string;
}
const StepEmail = ({ onNavigateForward, setEmail, email }: TEmailStep) => {
    const [currentEmail, setCurrentEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [validatedEmail, setValidatedEmail] = useState(false);
    if (email) {
        setCurrentEmail(email);
    }
    useEffect(() => {
        console.log(currentEmail);
        if (!currentEmail && touchedEmail) {
            setEmailError('пустое мыло');
        } else {
            if (
                !validateInput('email', currentEmail) &&
                touchedEmail &&
                validatedEmail
            ) {
                setEmailError('невалидное мыло.');
            } else {
                setEmailError('');
            }
        }
        if (!touchedEmail) {
            setTouchedEmail(true);
        }
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
        <div className="form__step">
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
                        setEmail(event.target.value);
                    }}
                    value={currentEmail}
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
            <span className="form__error">{'formError'}</span>
        </div>
    );
};
export default StepEmail;
