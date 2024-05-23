import { useEffect, useState } from '../../../reactor/index';
import { login } from '../../../entities/session/api/index';
import { Link } from '../../../shared/ui/link/index';
import { validateInput, updateInputError } from '../../../shared/lib/input/index';
import { Input, Button, ButtonLink } from '../../../shared/ui/index';
import { redirectTo } from '../../../app/router';
import { store } from '../../../app/app';
import { clsx } from '../../../shared/lib/clsx/index';
import './index.css';

/**
 * A LoginForm component that renders a login form.
 *
 * @function LoginForm
 * @returns {JSX.Element} The rendered login form component.
 */
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [formError, setFormError] = useState('');
    const emptyErrorText = 'Поле не может быть пустым';
    const formErrorText = 'Неверный логин или пароль';

    useEffect(() => {
        setEmail(email);
        setPassword(password);
    }, [email, password]); // protected router fix

    async function submitLogin(event: any) {
        event.preventDefault();
        setFormError('');
        if (!email || !password) {
            if (!password) setPasswordError(emptyErrorText);
            if (!email) setEmailError(emptyErrorText);
            return;
        }

        const emailValid = validateInput('email', email);
        const passwordValid = validateInput('password', password);
        if (!emailValid || !passwordValid) {
            setFormError(formErrorText);
            return;
        }
        try {
            const response = await login(email, password);
            store.dispatch({ type: 'UPDATE_USER', payload: response });
            store.dispatch({ type: 'UPDATE_AUTH', payload: true });
            store.dispatch({ type: 'SET_CSRFT', payload: response.csrft });
            redirectTo('/profile');
        } catch (error) {
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
                {Input({
                    type: 'email',
                    autocomplete: 'email',
                    placeholder: 'Ваш email',
                    maxlength: 40,
                    autofocus: true,
                    onInput: (event: any) => {
                        setEmail(event.target.value);
                    },
                    error: emailError,
                    setError: setEmailError,
                })}
                {Input({
                    type: 'password',
                    autocomplete: 'password',
                    placeholder: 'Ваш пароль',
                    minlength: 8,
                    maxlength: 32,
                    onInput: (event: any) => {
                        setPassword(event.target.value);
                    },
                    error: passwordError,
                    setError: setPasswordError,
                })}
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
            <span className={clsx(!formError && 'any--none', 'form__error')}>
                {formError}
            </span>
        </form>
    );
};
