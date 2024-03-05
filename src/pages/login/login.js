import loginTemplate from './login.hbs';
import FormHandler from '../../components/form/formHandler.js';

const formHandler = new FormHandler()

class Login {
    async render() {
        const formContext = {
            form : {
                id: 'login',
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
                            buttonId: 'submit'
                        },
                        fields: [
                        {
                            placeholder: 'Ваш email', 
                            type: 'email',
                            id: 'Email',
                            completion: 'email'
                        },
                        {
                            placeholder: 'Ваш пароль', 
                            type: 'password',
                            id: 'Password',
                            completion: 'current-password',
                            minlength: 8,
                            maxlength: 32,
                            password: 1
                        }, 
                        ]
                    },
                ]
            }
        }
        return loginTemplate(formContext);
    }

    async controller() {
        formHandler.setupDisplay();
        formHandler.setupErrorHandling();
    }
}

export default Login;
