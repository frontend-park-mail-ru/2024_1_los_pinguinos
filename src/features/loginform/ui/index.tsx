import { useState } from '../../../reactor';
import { login } from '../../../entities/session/api';
import { Link } from '../../../shared/routing/link';
import {clsx} from '../../../clsx/index';
import { validateInput } from '../../../shared/lib';
import { errorMessages, helpMessages } from './const';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorForm, setErrorForm] = useState({});
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPswd, setErrorPswd] = useState(null);

    const handleLogin = async (event: any) => {
        event.preventDefault();
        if (!validateInput('password', password)) {
            console.log('INVALID PASSWD', password);
            setErrorPswd(errorMessages.password);
            setErrorForm(err => {err.password = helpMessages.password});
        }
        if (!validateInput('email', email)) {
            setErrorEmail(errorMessages.email);
            setErrorForm(err => {err.email = helpMessages.email});
        }
        // if (!errorEmail && !errorPswd) {
        //     try {
        //         const response = await login(email, password);
        //         localStorage.setItem('Csrft', response.csrft);
        //         setErrorForm(false);
        //     } catch (error) {
        //         setErrorForm(true);
        //     }
        // }
    };

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
                                class="form__button form__button--icon"
                                id="pswdToggle"
                                // style="background: var(--pswd--hidden);"
                                // onclick={togglePassword}
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
            <div class={clsx("form__error", (Object.keys(errorForm).length === 0) && "any--hidden")}>error occured</div>
        </form>
    );
};

export default LoginForm;
