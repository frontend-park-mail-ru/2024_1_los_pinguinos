import loginTemplate from './login.hbs';
import FormHandler from '../components/form/formHandler.js';

const formHandler = new FormHandler()

class Login {
    async render() {
        const formContext = {
            form : {
                steps: 
                [
                    {
                        stepId: 0,
                        formTitle: 'Вход',
                        footerInfo: 'Нет аккаунта?',
                        footerLink: '/register',
                        footerLinkText: 'Регистрация',
                        formNavButton: {
                            buttonText: '<',
                            buttonId: 'navButton0'
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'continueButton0'
                        },
                        fields: [
                        {
                            placeholder: 'Ваш email', 
                            type: 'email',
                            id: 'emailField',
                            completion: 'email'
                        }, 
                        ]
                    },
                    {
                        stepId: 1,
                        formTitle: 'Вход',
                        formNavButton: {
                            buttonText: '<',
                            buttonId: 'navButton1'
                        },
                        formButton: {
                            buttonText: 'Войти',
                            buttonId: 'continueButton1'
                        },
                        fields: [
                        {
                            placeholder: 'Ваш пароль', 
                            type: 'password',
                            id: 'passwordField',
                            completion: 'current-password',
                            password: 1
                        }, 
                        ]
                    }
                ]
            }
        }
        return loginTemplate(formContext);
    }

    async controller() {
        formHandler.setupDisplay();
    }
}

export default Login;
