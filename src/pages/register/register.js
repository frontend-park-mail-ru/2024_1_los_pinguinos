import registerTemplate from './register.hbs';
import FormHandler from '../../components/form/formHandler.js';
import appStorageHandler from '../../components/basic/AppStorageHandler.js';

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
                                id: 'continueButton0',
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
                        ],
                    },
                    {
                        stepId: 'step1',
                        formStepClasses: [
                            'form__block--medium',
                        ],
                        buttonContainerClasses: [
                            'form__button-container--fixed-medium',
                        ],
                        formTitle: 'Давайте знакомиться',
                        formInfo: 'Заполните оставшиеся данные, чтобы другие люди могли узнать вас лучше',
                        formNavButton: {
                            classes:[
                                'form__button--nav',
                            ],
                            id: 'navButton1',
                        },
                        stepButtons: [
                            {
                                classes:[
                                    'form__button--continue',
                                ],
                                buttonText: 'Продолжить',
                                id: 'continueButton1',
                            },
                        ],
                        currentStep: `1/${totalSteps}`,
                        fields:
                        [
                            {
                                label: 'Ваше имя',
                                type: 'text',
                                id: 'name',
                                completion: 'name',
                                maxlength: 32,
                                minlength: 2,
                            },
                        ],
                        fieldsExtra:
                        [
                            {
                                label: 'Дата рождения',
                                type: 'date',
                                id: 'birthday',
                                min: '1970-01-01',
                                max: '2009-01-01',
                            },
                        ],
                        choiceLabel: 'Ваш пол',
                        extraFieldContainerClasses:[
                            'form__field-container--side',
                        ],
                        checkBoxContainerClasses:[
                            'form__checkbox-container--side',
                        ],
                        checkBoxListClasses:[
                            'form__checkbox-list--side',
                        ],
                        choices:
                        [
                            {
                                classes:[
                                    'form__button--checkbox',
                                    'form__button--round',
                                ],
                                id: 'GenderM',
                                buttonText: 'М',
                            },
                            {
                                classes:[
                                    'form__button--checkbox',
                                    'form__button--round',
                                ],
                                id: 'GenderF',
                                buttonText: 'Ж',
                            },
                        ],
                    },
                    {
                        stepId: 'step2',
                        formStepClasses:[
                            'form__block--medium',
                        ],
                        buttonContainerClasses:[
                            'form__button-container--fixed-medium',
                        ],
                        formTitle: 'Чем будем заниматься?',
                        formInfo: 'Выберите какими типами активностей вы увлекаетесь',
                        formNavButton: {
                            classes:[
                                'form__button--nav',
                            ],
                            id: 'navButton2',
                        },
                        stepButtons: [
                            {
                                classes:[
                                    'form__button--continue',
                                ],
                                buttonText: 'Продолжить',
                                id: 'continueButton2',
                            },
                        ],
                        currentStep: `2/${totalSteps}`,
                        checkBoxListClasses:[
                            'form__checkbox-list--cut',
                        ],
                        choices: appStorageHandler.appInterests,
                    },
                    {
                        stepId: 'step3',
                        formTitle: 'Почти закончили',
                        formInfo: 'Остался последний шаг, введите пароль',
                        formNavButton: {
                            classes:[
                                'form__button--nav',
                            ],
                            id: 'navButton3',
                        },
                        stepButtons: [
                            {
                                classes:[
                                    'form__button--continue',
                                ],
                                buttonText: 'Завершить',
                                id: 'submit',
                                submitAction: 'register',
                            },
                        ],
                        currentStep: `3/${totalSteps}`,
                        fields:
                        [
                            {
                                classes:[
                                    'form__input--icon',
                                ],
                                label: 'Ваш пароль',
                                type: 'password',
                                id: 'password',
                                completion: 'new-password',
                                minlength: 8,
                                maxlength: 32,
                                iconButton: {
                                    classes:[
                                        'form__icon-button',
                                    ],
                                    id: 'pswdToggle',
                                },
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
        formHandler.setupDisplay(document.querySelector('.form'));
    }
}

export default Register;
