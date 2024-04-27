import { useState } from '../../../reactor';
import { login } from '../../../entities/session/api';
import { Link } from '../../../shared/routing/link';
import {clsx} from '../../../clsx/index';
import { validateInput } from '../../../shared/lib';
import { errorMessages, helpMessages } from './const';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorForm, setErrorForm] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPswd, setErrorPswd] = useState('');

    const handleLogin = async (event: any) => {
        const pswd = document.getElementById('password');
        pswd.type = 'password';
        setErrorForm((err) => err.replace(helpMessages.login, ''));
        event.preventDefault();
        const validPswd = validateInput('password', password);
        const validEmail = validateInput('email', email); 
        if (!validPswd) {
            if (!errorForm.includes(helpMessages.password)){
                setErrorPswd(errorMessages.password);
                setErrorForm((err) => err + '\n' + helpMessages.password);
            }
        }
        else {
            setErrorPswd('');
            setErrorForm((err) => err.replace(helpMessages.password, ''));
        }
        if (!validEmail) {
            if (!errorForm.includes(helpMessages.email)) {
            setErrorEmail(errorMessages.email);
            setErrorForm((err) => err + '\n' + helpMessages.email);
            }
        }
        else {
            setErrorEmail('');
            setErrorForm((err) => err.replace(helpMessages.email, ''));
        }
        if (validPswd && validEmail) {
        try {
            const response = await login(email, password);
            localStorage.setItem('Csrft', response.csrft);
        } catch (error) {
            setErrorForm(helpMessages.login);
        }
    }
    };

    const togglePswd = (event: any) => {
        event.target.classList.toggle('eye--inv');
        event.target.classList.toggle('eye--vis');
        const input = event.target.closest('div').querySelector('input');
        input.type = input.type === 'text' ? 'password' : 'text';
    }

    return (
        <form class="form " id="login" onSubmit={handleLogin}>
            <div class="form__block " id="step0" style="display: block;">
                <div class="form__header">
                    <Link back={true}>
                        <button
                            type="button"
                            class="form__button form__button--nav"
                            id="btn2"
                        ></button>
                    </Link>
                </div>
                <div class="form__title ">
                    <p>Вход</p>
                </div>
                <div class="form__input-container">
                    <div class="form__field-container ">
                        <div class="form__field">
                            <input
                                class="form__input "
                                id="email"
                                type="email"
                                maxlength="320"
                                autocomplete="email"
                                placeholder="Ваш email"
                                onInput={(event: any) => {setEmail(event.target.value);}}
                            />
                            <div class={clsx("field__error", !errorEmail && "any--hidden")}>{errorEmail}</div>
                        </div>
                        <div class="form__field">
                            <input
                                class="form__input form__input--icon"
                                id="password"
                                type="password"
                                minlength="8"
                                maxlength="32"
                                autocomplete="current-password"
                                placeholder="Ваш пароль"
                                onInput={(event: any) => {setPassword(event.target.value);}}
                            />
                            <button
                                type="button"
                                class="form__button eye eye--inv"
                                id="pswdToggle"
                                // style="background: var(--pswd--hidden);"
                                onclick={togglePswd}
                            >
                            </button>
                            <div class={clsx("field__error", !errorPswd && "any--hidden")}>{errorPswd}</div>
                        </div>
                    </div>
                </div>
                <div class="form__button-container ">
                    <button
                        type="submit"
                        class="form__button form__button--continue"
                        id="btn3"
                    >
                        <span class="button__span ">Продолжить</span>
                    </button>
                </div>
                <div class="form__footer">
                    <p>
                        Нет аккаунта?{' '}
                        <Link
                            className="form__link"
                            to="/register"
                            persistent={true}
                        >
                            Регистрация
                        </Link>
                    </p>
                </div>
            </div>
            <div class={clsx("form__error", !errorForm && "any--hidden")}>{errorForm}</div>
        </form>
    );
};

export default LoginForm;
