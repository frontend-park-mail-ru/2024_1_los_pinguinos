import registerTemplate from './register.hbs';
import FormHandler from '../../components/form/formHandler.js';
import apiHandler from '../../api/apiHandler.js';

const formHandler = new FormHandler();
/**
 * Registration page class
 * @author roflanpotsan
 * @class
 */
class Register {
    /**
     * Returns registration page template
     * @author roflanpotsan
     * @function
     * @returns {Promise<string>}  - template html string
     */
    async render() {
        const data = await apiHandler.GetInterests();
        let interests;
        if (data) {
            interests = JSON.parse(data);
        } else {
            interests = [];
        }
        const totalSteps = 3;
        const formContext = {
            form : {
                id: 'registration',
                steps:
                [
                    {
                        stepId: 'step0',
                        formTitle: 'Регистрация',
                        footerInfo: 'Уже есть аккаунт?',
                        footerLink: '/login',
                        footerLinkText: 'Войти',
                        formNavButton: {
                            buttonId: 'navButton0',
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'continueButton0',
                        },
                        fields: [
                        {
                            placeholder: 'Ваш email',
                            type: 'email',
                            id: 'email',
                            completion: 'email',
                        },
                        ],
                    },
                    {
                        stepId: 'step1',
                        fixedSize: 'medium',
                        formTitle: 'Давайте знакомиться',
                        formInfo: 'Заполните оставшиеся данные, чтобы другие люди могли узнать вас лучше',
                        formNavButton: {
                            buttonId: 'navButton1',
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'continueButton1',
                        },
                        currentStep: `1/${totalSteps}`,
                        fields:
                        [
                            {
                                label: 'Ваше имя',
                                type: 'text',
                                id: 'name',
                                completion: 'name',
                            },
                        ],
                        fieldsExtra:
                        [
                            {
                                label: 'Дата рождения',
                                type: 'date',
                                id: 'birthday',
                                placeholder: '2022-02-22',
                                min: '1940-01-01',
                                max: '2999-01-01',
                            },
                        ],
                        choiceLabel: 'Ваш пол',
                        side: 1,
                        choices:
                        [
                            {
                                ID: 'GenderM',
                                Name: 'М',
                                round: 1,
                            },
                            {
                                ID: 'GenderF',
                                Name: 'Ж',
                                round: 1,
                            },
                        ],
                    },
                    {
                        stepId: 'step2',
                        fixedSize: 'medium',
                        formTitle: 'Чем будем заниматься?',
                        formInfo: 'Выберите какими типами активностей вы увлекаетесь',
                        formNavButton: {
                            buttonId: 'navButton2',
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'continueButton2',
                        },
                        currentStep: `2/${totalSteps}`,
                        list: 1,
                        choices:
                        interests,
                    },
                    {
                        stepId: 'step3',
                        formTitle: 'Почти закончили',
                        formInfo: 'Остался последний шаг, введите пароль',
                        formNavButton: {
                            buttonId: 'navButton3',
                        },
                        formButton: {
                            buttonText: 'Завершить',
                            buttonId: 'submit',
                        },
                        currentStep: `3/${totalSteps}`,
                        fields:
                        [
                            {
                                label: 'Ваш пароль',
                                type: 'password',
                                id: 'password',
                                completion: 'new-password',
                                minlength: 8,
                                maxlength: 32,
                                password: 1,
                            },
                        ],
                    },
                ],
            },
        };

        return registerTemplate(formContext);
    }
    /**
     * Sets up page event handlers
     * @author roflanpotsan
     * @function
     */
    async controller(){
        formHandler.setupDisplay();
        formHandler.setupCheckboxes();
        formHandler.setupEnterEvents();
    }
}

export default Register;
