import { useEffect, useState } from '../../../reactor/index';
import { login } from '../../../entities/session/api/index';
import { Link } from '../../../shared/routing/link';
import { validateInput, togglePassword } from '../../../shared/lib/index';
import { Input } from '../../../shared/ui/input/input';
import { ButtonLink } from '../../../shared/ui/button/buttonLink';
import { Button } from '../../../shared/ui/button/button';
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailEmpty, setEmailEmpty] = useState('');
    const [passwordEmpty, setPasswordEmpty] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const emptyErrorText = 'Поле не может быть пустым';
    const formErrorText = 'Неверный логин или пароль';
    useEffect(() => {
        if (!email && touchedEmail) {
            setEmailEmpty(emptyErrorText);
        } else {
            setEmailEmpty('');
        }
        if (!touchedEmail) {
            setTouchedEmail(true);
        }
        return () => {};
    }, [email]);
    useEffect(() => {
        if (!password && touchedPassword) {
            setPasswordEmpty(emptyErrorText);
        } else {
            setPasswordEmpty('');
        }
        if (!touchedPassword) {
            setTouchedPassword(true);
        }
        return () => {};
    }, [password]);
    async function submitLogin(event: any) {
        event.preventDefault();
        setFormError('');
        if (!password || !email) {
            if (!password) {
                setPasswordEmpty(emptyErrorText);
            }
            if (!email) {
                setEmailEmpty(emptyErrorText);
            }
            return;
        }
        if (!passwordEmpty && !emailEmpty) {
            const emailValid = validateInput('email', email);
            const passwordValid = validateInput('password', password);
            if (emailValid && passwordValid) {
                try {
                    const response = await login(email, password);
                    localStorage.setItem('Csrft', response.csrft); // store properly in redux
                    return;
                } catch (error) {
                    setFormError(formErrorText);
                    return;
                }
            }
            setFormError(formErrorText);
        }
    }
    return (
        <form className="form" onSubmit={submitLogin}>
            <div className="form__header">
                <ButtonLink
                    icon="icon-chevron-left"
                    fontSize="xl"
                    severity="link"
                    back
                />
            </div>
            <span className="form__title">Вход</span>
            <div className="form__input-container">
                <Input
                    type="email"
                    autocomplete="email"
                    placeholder="Ваш email"
                    maxlength={320}
                    autofocus
                    value={email}
                    onInput={(event: any) => {
                        setEmail(event.target.value);
                    }}
                    error={emailEmpty}
                />
                <Input
                    type="password"
                    autocomplete="password"
                    placeholder="Ваш пароль"
                    minlength={8}
                    maxlength={32}
                    value={password}
                    onInput={(event: any) => {
                        setPassword(event.target.value);
                    }}
                    error={passwordEmpty}
                />
                <Button
                    label="Продолжить"
                    type="submit"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                />
            </div>
            <span className="form__footer">
                Нет аккаунта?
                <Link to="/register" persistent>
                    Регистрация
                </Link>
            </span>
            <span className="form__error">{formError}</span>
        </form>
    );
};
