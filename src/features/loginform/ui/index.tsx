import { useEffect, useState } from '../../../reactor/index';
import { login } from '../../../entities/session/api/index';
import { Link } from '../../../shared/routing/link';
import { validateInput, updateInputError } from '../../../shared/lib/index';
import { Input, Button, ButtonLink } from '../../../shared/ui/index';
import { redirectTo } from '../../../app/Router';
export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [formError, setFormError] = useState('');
    const emptyErrorText = 'Поле не может быть пустым';
    const formErrorText = 'Неверный логин или пароль';
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
            redirectTo('/profile');
            console.log(response.csrft);
            localStorage.setItem('X-CSRF-TOKEN', response.csrft); // store in redux!!!!
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
            <span className="form__error">{formError}</span>
        </form>
    );
};
