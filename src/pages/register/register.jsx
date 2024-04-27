import { useState } from '../../reactor/index';
import InterestsInput from '../../widgets/interestsInput';
import { register } from '../../entities/session/api';
import { Link } from '../../shared/routing/link';
import { clsx } from '../../clsx/index';
import { togglePassword } from '../../shared/lib/index';

export const Register = () => {
    const [form1, setForm1] = useState(true);
    const [form2, setForm2] = useState(false);
    const [form3, setForm3] = useState(false);
    const [form4, setForm4] = useState(false);
    const [error, setError] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPswd, setErrorPswd] = useState('');
    const [errorAge, setErrorAge] = useState('');
    const [errorSex, setErrorSex] = useState('');

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');

    const from1to2 = () => {
        setForm1(false);
        setForm2(true);
    };

    const from2to3 = () => {
        setForm2(false);
        setForm3(true);
    };

    const from3to4 = () => {
        setForm3(false);
        setForm4(true);
    };

    const from4to3 = () => {
        setForm4(false);
        setForm3(true);
    };

    const from3to2 = () => {
        setForm3(false);
        setForm2(true);
    };

    const from2to1 = () => {
        setForm2(false);
        setForm1(true);
    };

    const registerUser = async () => {
        try {
            await register({
                email: email,
                name: name,
                age: age,
                interests: selectedInterests,
                password: password,
            });
        } catch (e) {
            setError(true);
        }
    };

    const interests = ['Игры', 'Музыка', 'Кино', 'Технологии'];

    const [selectedInterests, setSelectedInterests] = useState([]);

    return (
        <div className="wrapper">
            <form className="form " id="registration">
                <div
                    className="form__block "
                    id="step0"
                    style={clsx(form1 && 'display: block;')}
                >
                    <div className="form__header">
                        <Link back={true}>
                            <button
                                type="button"
                                className="form__button form__button--nav "
                                id="btn4"
                            ></button>
                        </Link>
                    </div>
                    <div className="form__title ">
                        <p>Регистрация</p>
                    </div>
                    <div className="form__input-container">
                        <div className="form__field-container ">
                            <div className="form__field">
                                <input
                                    className="form__input"
                                    id="email"
                                    type="email"
                                    maxLength="320"
                                    autoComplete="email"
                                    placeholder="Ваш email"
                                />
                                <div
                                    className={clsx(
                                        'field__error',
                                        !errorEmail && 'any--hidden',
                                    )}
                                >
                                    {errorEmail}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form__button-container ">
                        <button
                            type="button"
                            className="form__button form__button--continue "
                            id="btn5"
                            onClick={from1to2}
                        >
                            <span className="button__span ">Продолжить</span>
                        </button>
                        <div className="field__error"></div>
                    </div>
                    <div className="form__footer">
                        <p>
                            Уже есть аккаунт?{' '}
                            <Link
                                className="form__link"
                                to="/login"
                                persistent={true}
                            >
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>
                <div
                    className={clsx(
                        'form__block',
                        'form__block--medium',
                        !form2 && 'any--hidden',
                    )}
                    id="step1"
                    style={clsx(form2 && 'display: block;')}
                >
                    <div className="form__header">
                        <button
                            type="button"
                            className="form__button form__button--nav "
                            id="btn6"
                            onClick={from2to1}
                        ></button>
                        <div className="field__error"></div>
                        <p className="form__step-count">1/3</p>
                    </div>
                    <div className="form__title ">
                        <p>Давайте знакомиться</p>
                    </div>
                    <div className="form__info ">
                        <p>
                            Заполните оставшиеся данные, чтобы другие люди могли
                            узнать вас лучше
                        </p>
                    </div>
                    <div className="form__input-container">
                        <div className="form__field-container ">
                            <div className="form__field">
                                <label className="form__label " htmlFor="name">
                                    Ваше имя
                                </label>
                                <input
                                    className="form__input "
                                    id="name"
                                    type="text"
                                    minLength="2"
                                    maxLength="32"
                                    autoComplete="name"
                                />
                                <div className="field__error any--hidden"></div>
                            </div>
                        </div>
                    </div>
                    <div className="form__input-container">
                        <div className="form__field-container form__field-container--side ">
                            <div className="form__field">
                                <label
                                    className="form__label "
                                    htmlFor="birthday"
                                >
                                    Дата рождения
                                </label>
                                <input
                                    className="form__input "
                                    id="birthday"
                                    type="date"
                                    min="1970-01-01"
                                    max="2009-01-01"
                                />
                                <div className="field__error any--hidden"></div>
                            </div>
                        </div>
                        <div className="form__checkbox-container form__checkbox-container--side ">
                            <label className="form__label">Ваш пол</label>
                            <div className="form__checkbox-list form__checkbox-list--side ">
                                <button
                                    type="button"
                                    className="form__button form__button--checkbox form__button--round "
                                    id="GenderM"
                                >
                                    <span className="button__span ">М</span>
                                </button>
                                <div className="field__error"></div>
                                <button
                                    type="button"
                                    className="form__button form__button--checkbox form__button--round "
                                    id="GenderF"
                                >
                                    <span className="button__span ">Ж</span>
                                </button>
                                <div className="field__error"></div>
                            </div>
                        </div>
                    </div>
                    <div className="form__button-container form__button-container--fixed-medium ">
                        <button
                            type="button"
                            className="form__button form__button--continue "
                            id="btn7"
                            onClick={from2to3}
                        >
                            <span className="button__span ">Продолжить</span>
                        </button>
                        <div className="field__error"></div>
                    </div>
                </div>
                <div
                    className={clsx(
                        'form__block',
                        'form__block--medium',
                        !form3 && 'any--hidden',
                    )}
                    id="step2"
                    style={clsx(form3 && 'display: block;')}
                >
                    <div className="form__header">
                        <button
                            type="button"
                            className="form__button form__button--nav "
                            id="btn8"
                            onClick={from3to2}
                        ></button>
                        <div className="field__error"></div>
                        <p className="form__step-count">2/3</p>
                    </div>
                    <div className="form__title ">
                        <p>Чем будем заниматься?</p>
                    </div>
                    <div className="form__info ">
                        <p>Выберите какими типами активностей вы увлекаетесь</p>
                    </div>
                    <div className="form__input-container"></div>
                    <div className="form__input-container">
                        <div className="form__checkbox-container ">
                            <div className="form__checkbox-list form__checkbox-list--cut ">
                                <InterestsInput
                                    interests={interests}
                                    selectedInterests={selectedInterests}
                                    setSelectedInterests={setSelectedInterests}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form__button-container form__button-container--fixed-medium ">
                        <button
                            type="button"
                            className="form__button form__button--continue "
                            id="btn9"
                            onClick={from3to4}
                        >
                            <span className="button__span ">Продолжить</span>
                        </button>
                        <div className="field__error"></div>
                    </div>
                </div>
                <div
                    className={clsx(
                        'form__block',
                        'form__block--medium',
                        !form4 && 'any--hidden',
                    )}
                    id="step3"
                    style={clsx(form4 && 'display: block;')}
                >
                    <div className="form__header">
                        <button
                            type="button"
                            className="form__button form__button--nav "
                            id="btn19"
                            onClick={from4to3}
                        ></button>
                        <div className="field__error"></div>
                        <p className="form__step-count">3/3</p>
                    </div>
                    <div className="form__title ">
                        <p>Почти закончили</p>
                    </div>
                    <div className="form__info ">
                        <p>Остался последний шаг, введите пароль</p>
                    </div>
                    <div className="form__input-container">
                        <div className="form__field-container ">
                            <div className="form__field">
                                <label
                                    className="form__label "
                                    htmlFor="password"
                                >
                                    Ваш пароль
                                </label>
                                <input
                                    className="form__input form__input--icon "
                                    id="password"
                                    type="password"
                                    minLength="8"
                                    maxLength="32"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="form__button eye eye--inv"
                                    id="pswdToggle"
                                    onClick={togglePassword}
                                ></button>
                                <div className="field__error"></div>
                                <div className="field__error any--hidden"></div>
                            </div>
                        </div>
                    </div>
                    <div className="form__button-container ">
                        <button
                            type="submit"
                            className="form__button form__button--continue "
                            id="btn20"
                        >
                            <span className="button__span ">Завершить</span>
                        </button>
                        <div className="field__error"></div>
                    </div>
                </div>
                <div className="form__error any--hidden "></div>
            </form>
        </div>
    );
};
