import loginTemplate from './login.hbs';
import FormHandler from '../../components/form/formHandler.js';

const formHandler = new FormHandler();
/**
 * Login page class
 * @author roflanpotsan
 * @class
 */
class Login {
    /**
     * Returns login page template
     * @author roflanpotsan
     * @function
     * @returns {Promise<string>}  - template html string
     */
    async render() {
        const formContext = {
            form : {
                id: 'login',
                steps:
                [
                    {
                        stepId: 'step0',
                        formTitle: 'Вход',
                        footerInfo: 'Нет аккаунта?',
                        footerLink: '/register',
                        footerLinkText: 'Регистрация',
                        formNavButton: {
                            classes: [
                                'form__button--nav',
                            ],
                            id: 'navButton0',
                        },
                        stepButtons: [
                            {
                                classes: [
                                    'form__button--continue',
                                ],
                                buttonText: 'Продолжить',
                                id: 'submit',
                                submitAction: 'login',
                            },
                        ],
                        fields: [
                        {
                            placeholder: 'Ваш email',
                            type: 'email',
                            id: 'email',
                            completion: 'email',
                            maxlength: 320,
                        },
                        {
                            classes: [
                                'form__input--icon',
                            ],
                            placeholder: 'Ваш пароль',
                            type: 'password',
                            id: 'password',
                            completion: 'current-password',
                            minlength: 8,
                            maxlength: 32,
                            iconButton: {
                                classes: [
                                    'form__button--icon',
                                ],
                                id: 'pswdToggle',
                            },
                        },
                        ],
                    },
                ],
            },
        };

        return loginTemplate(formContext);
    }

    /**
     * Sets up page event handlers
     * @author roflanpotsan
     * @function
     */
    async controller() {
        formHandler.setupDisplay(document.querySelector('.form'));
    }
}

export default Login;
