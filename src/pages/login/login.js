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
                            buttonText: '<',
                            buttonId: 'navButton0',
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'submit',
                        },
                        fields: [
                        {
                            placeholder: 'Ваш email',
                            type: 'email',
                            id: 'email',
                            completion: 'email',
                            maxlength: 320,
                        },
                        {
                            placeholder: 'Ваш пароль',
                            type: 'password',
                            id: 'password',
                            completion: 'current-password',
                            minlength: 8,
                            maxlength: 32,
                            password: 1,
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
        formHandler.setupDisplay();
        formHandler.setupEnterEvents();
    }
}

export default Login;
