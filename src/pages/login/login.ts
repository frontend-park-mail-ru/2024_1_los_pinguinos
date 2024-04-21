import loginTemplate from './login.hbs';
// import FormHandler from '../../components/form/formHandler.js';
// import componentHandler from '../../components/basic/ComponentHandler.js';
import { IPage } from '../../shared/config/interfaces';
// const formHandler = new FormHandler();
/**
 * Login page class
 * @class
 */
class Login implements IPage{
    /**
     * Returns login page template
     * @function
     * @returns {Promise<string>}  - template html string
     */
    async render() {
        const textContinue = 'Продолжить';
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
                        // formNavButton: componentHandler.generateComponentContext('btn', ['form__button--nav']),
                        stepButtons: [
                            // componentHandler.generateComponentContext('btn', ['form__button--continue'], {buttonText: textContinue, submitAction: 'login'}),
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
     * @function
     */
    async controller() {
        // formHandler.setupDisplay(document.querySelector('.form'));
    }
}

export default Login;
