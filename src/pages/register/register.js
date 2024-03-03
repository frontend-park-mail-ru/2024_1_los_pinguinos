import registerTemplate from './register.hbs';
import FormHandler from '../components/form/formHandler.js';

const formHandler = new FormHandler()

class Register {
    async render() {
        const totalSteps = 3;
        const formContext = {
            form : {
                steps: 
                [
                    {
                        stepId: 0,
                        formTitle: 'Регистрация',
                        footerInfo: 'Уже есть аккаунт?',
                        footerLink: '/login',
                        footerLinkText: 'Войти',
                        formNavButton: {
                            buttonId: 'navButton0'
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'continueButton0'
                        },
                        fields: [
                        {
                            placeholder: `Ваш email`, 
                            type: 'email',
                            pattern: ``,
                            id: 'emailField',
                            completion: 'email'
                        }, 
                        ]
                    },
                    {
                        stepId: 1,
                        formTitle: 'Давайте знакомиться',
                        formInfo: 'Заполните оставшиеся данные, чтобы другие люди могли узнать вас лучше',
                        formNavButton: {
                            buttonId: 'navButton1'
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'continueButton1'
                        },
                        currentStep: `1/${totalSteps}`,
                        fields: 
                        [
                            {
                                label: 'Ваше имя', 
                                type: 'text',
                                pattern: ``,
                                id: 'nameField',
                                completion: 'name'
                            },
                        ],
                        fieldsExtra: 
                        [
                            {
                                label: 'Дата рождения', 
                                type: 'text',
                                pattern: ``,
                                id: 'birthDateField',
                                completion: 'date',
                                placeholder: '02.02.2022',
                            },
                        ],
                        choiceLabel: 'Ваш пол',
                        side: 1,
                        choices: 
                        [
                            {
                                id: 'sexMale',
                                text: 'М',
                                round: 1
                            },
                            {
                                id: 'sexFemale',
                                text: 'Ж',
                                round: 1,
                            }
                        ]
                    },
                    {
                        stepId: 2,
                        formTitle: 'Чем будем заниматься?',
                        formInfo: 'Выберите какими типами активностей вы увлекаетесь',
                        formNavButton: {
                            buttonId: 'navButton2'
                        },
                        formButton: {
                            buttonText: 'Продолжить',
                            buttonId: 'continueButton2'
                        },
                        currentStep: `2/${totalSteps}`,
                        list: 1,
                        choices: 
                        [
                            {
                                id: 'activity1',
                                text: 'спортзал'
                            },
                            {
                                id: 'activity2',
                                text: 'бег'
                            },
                            {
                                id: 'activity3',
                                text: 'плавание'
                            },
                            {
                                id: 'activity4',
                                text: 'йога'
                            },
                            {
                                id: 'activity5',
                                text: 'велоспорт'
                            },
                            {
                                id: 'activity6',
                                text: 'каноэ'
                            },{
                                id: 'activity7',
                                text: 'калистеника'
                            },
                            {
                                id: 'activity8',
                                text: 'фитнес'
                            }, 
                            {
                                id: 'activity9',
                                text: 'бокс'
                            }
                        ]
                    },
                    {
                        stepId: 3,
                        formTitle: 'Почти закончили',
                        formInfo: 'Остался последний шаг, введите пароль',
                        formNavButton: {
                            buttonId: 'navButton3'
                        },
                        formButton: {
                            buttonText: 'Завершить',
                            buttonId: 'continueButton3'
                        },
                        currentStep: `3/${totalSteps}`,
                        fields: 
                        [
                            {
                                label: "Ваш пароль",
                                type: "password",
                                id: "passwordField",
                                completion: 'new-password',
                                password: 1
                            }
                        ]
                    }
                ]
            }
        }
        return registerTemplate(formContext);
    }
    
    async controller(){
        formHandler.setupDisplay();
    }

}

export default Register;
