import profileTemplate from './profile.hbs';
import profileImg from '../../components/form/profile.svg';
import emailImg from '../../components/form/email.svg';
import passwordImg from '../../components/form/password.svg';
import exitImg from '../../components/form/exit.svg';
import ProfileHandler from '../../components/profile/profileHandler';
import userUtility from '../../models/user/User.js';
import componentHandler from '../../components/basic/ComponentHandler.js';
import { getInterests } from '../../components/basic/utils.js';
import { store } from '../../../index.js';

class Profile {

    subscribe() {
        store.subscribe(newState => {
            console.log(newState);
        });
    }

    async render() {
        const user = store.getState();
        const userInterestsDisplay = userUtility.DisplayInterests(user.interests);
        const photos = userUtility.DisplayPictures(user.photos);
        const textCancel = 'Отмена';
        const cancelClasses = ['form__button--cancel', 'form__button--dialog'];
        const submitClasses = ['form__button--continue', 'form__button--dialog'];
        const actionUpdate = 'updateProfile';
        const textSubmit = 'Сохранить';
        const profileContext = {
            profile: {
                title1: 'Профиль',
                title2: 'Безопасность',
                blockTitle: 'Профиль',
                biography: {
                    blockId: 'biography',
                    labelText: 'О себе',
                    bioText: user.description,
                    labelButton: componentHandler.generateComponentContext('btn', ['form__button--edit'], {noErrors: 1}),
                    settingDialog: {
                        dialogForm: {
                            noErrors: 1,
                            classes: [
                                'form__dialog',
                            ],
                            id: 'bioDialog',
                            steps:
                            [
                                {
                                    formStepClasses: [
                                        'form__block--dialog',
                                    ],
                                    formTitleClasses: [
                                        'form__title--dialog',
                                    ],
                                    formInfoClasses: [
                                        'form__info--dialog',
                                    ],
                                    buttonContainerClasses: [
                                        'form__button-container--dialog',
                                    ],
                                    fieldContainerClasses: [
                                        'form__field-container--dialog',
                                    ],
                                    stepId: 'step0',
                                    formTitle: 'Изменить биографию',
                                    formInfo: 'Отредактируйте информацию о себе',
                                    stepButtons: [
                                        componentHandler.generateComponentContext('btn', cancelClasses, {buttonText: textCancel}),
                                        componentHandler.generateComponentContext('btn', submitClasses, {buttonText: textSubmit, submitAction: actionUpdate}),
                                    ],
                                    fields: [
                                        {
                                            textArea: 1,
                                            label: 'О себе',
                                            labelClasses: [
                                                'form__label--dialog',
                                            ],
                                            classes: [
                                                'form__textarea--dialog',
                                            ],
                                            id: 'description',
                                            maxlength: 320,
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
                interests: {
                    blockId: 'interests',
                    labelText: 'Ваши интересы',
                    labelButton: componentHandler.generateComponentContext('btn', ['form__button--edit'], {noErrors: 1}),
                    interests: userInterestsDisplay,
                    settingDialog: {
                        dialogForm: {
                            noErrors: 1,
                            classes: [
                                'form__dialog',
                            ],
                            id: 'interestsDialog',
                            steps:
                            [
                                {
                                    formStepClasses: [
                                        'form__block--dialog',
                                    ],
                                    formTitleClasses: [
                                        'form__title--dialog',
                                    ],
                                    formInfoClasses: [
                                        'form__info--dialog',
                                    ],
                                    buttonContainerClasses: [
                                        'form__button-container--dialog',
                                    ],
                                    fieldContainerClasses: [
                                        'form__field-container--dialog',
                                    ],
                                    stepId: 'step0',
                                    formTitle: 'Изменить интересы',
                                    formInfo: 'Выберите интересы',
                                    stepButtons: [
                                        componentHandler.generateComponentContext('btn', cancelClasses, {buttonText: textCancel}),
                                        componentHandler.generateComponentContext('btn', submitClasses, {buttonText: textSubmit, submitAction: actionUpdate}),
                                    ],
                                    checkBoxListClasses: [
                                        'form__checkbox-list--mb',
                                    ],
                                    choices: await getInterests(),
                                },
                            ],
                        },
                    },
                },
                pictures:{
                    profilePictures: photos,
                },
                security: {
                    blockId: 'security',
                    labelText: 'Информация об аккаунте',
                    actionButton: {
                        classes: [
                            'form__button--navbar',
                            'form__button--logout',
                        ],
                        buttonText: 'Удалить аккаунт',
                        action: 'deleteProfile',
                        id: 'profileDelete',
                    },
                    securityOptions: [
                        {
                            iconSource: encodeURIComponent(profileImg),
                            labelText: 'Ваше имя',
                            valueText: store.getState().name,
                            actionButton: componentHandler.generateComponentContext('btn', ['form__button--edit'], {noErrors: 1}),
                            settingDialog: {
                                dialogForm: {
                                    noErrors: 1,
                                    classes: [
                                        'form__dialog',
                                    ],
                                    id: 'nameDialog',
                                    steps:
                                    [
                                        {
                                            formStepClasses: [
                                                'form__block--dialog',
                                            ],
                                            formTitleClasses: [
                                                'form__title--dialog',
                                            ],
                                            formInfoClasses: [
                                                'form__info--dialog',
                                            ],
                                            buttonContainerClasses: [
                                                'form__button-container--dialog',
                                            ],
                                            fieldContainerClasses: [
                                                'form__field-container--dialog',
                                            ],
                                            stepId: 'step0',
                                            formTitle: 'Изменить имя',
                                            formInfo: 'Введите новое имя',
                                            stepButtons: [
                                                componentHandler.generateComponentContext('btn', cancelClasses, {buttonText: textCancel}),
                                                componentHandler.generateComponentContext('btn', submitClasses, {buttonText: textSubmit, submitAction: actionUpdate}),
                                            ],
                                            fields: [
                                                {
                                                    label: 'Ваше имя',
                                                    labelClasses: [
                                                        'form__label--dialog',
                                                    ],
                                                    classes: [
                                                        'form__input--dialog',
                                                    ],
                                                    placeholder: user.name,
                                                    type: 'text',
                                                    id: 'name',
                                                    maxlength: 32,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            iconSource: encodeURIComponent(emailImg),
                            labelText: 'Ваш email',
                            valueText: userUtility.formattedEmail(user.email),
                            actionButton: componentHandler.generateComponentContext('btn', ['form__button--edit'], {noErrors: 1}),
                            settingDialog: {
                                dialogForm: {
                                    noErrors: 1,
                                    classes: [
                                        'form__dialog',
                                    ],
                                    id: 'emailDialog',
                                    steps:
                                    [
                                        {
                                            formStepClasses: [
                                                'form__block--dialog',
                                            ],
                                            formTitleClasses: [
                                                'form__title--dialog',
                                            ],
                                            formInfoClasses: [
                                                'form__info--dialog',
                                            ],
                                            buttonContainerClasses: [
                                                'form__button-container--dialog',
                                            ],
                                            fieldContainerClasses: [
                                                'form__field-container--dialog',
                                            ],
                                            stepId: 'step0',
                                            formTitle: 'Изменить email',
                                            formInfo: 'Введите новый email и текущий пароль',
                                            stepButtons: [
                                                componentHandler.generateComponentContext('btn', cancelClasses, {buttonText: textCancel}),
                                                componentHandler.generateComponentContext('btn', submitClasses, {buttonText: textSubmit, submitAction: actionUpdate}),
                                            ],
                                            fields: [
                                                {
                                                    label: 'Новый email',
                                                    labelClasses: [
                                                        'form__label--dialog',
                                                    ],
                                                    classes: [
                                                        'form__input--dialog',
                                                    ],
                                                    placeholder: 'Ваш email',
                                                    type: 'email',
                                                    id: 'email',
                                                    completion: 'email',
                                                    maxlength: 320,
                                                },
                                                {
                                                    label: 'Текущий пароль',
                                                    labelClasses: [
                                                        'form__label--dialog',
                                                    ],
                                                    classes: [
                                                        'form__input--icon',
                                                        'form__input--dialog',
                                                    ],
                                                    placeholder: 'Ваш пароль',
                                                    type: 'password',
                                                    id: 'oldPassword ',
                                                    completion: 'current-password',
                                                    minlength: 8,
                                                    maxlength: 32,
                                                    iconButton: {
                                                        classes: [
                                                            'form__button--icon',
                                                            'form__button--icon-dialog',
                                                        ],
                                                        id: 'pswdToggle1',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            iconSource: encodeURIComponent(passwordImg),
                            labelText: 'Ваш пароль',
                            valueText: '********',
                            actionButton: componentHandler.generateComponentContext('btn', ['form__button--edit'], {noErrors: 1}),
                            settingDialog: {
                                dialogForm: {
                                    noErrors: 1,
                                    classes: [
                                        'form__dialog',
                                    ],
                                    id: 'pswdDialog',
                                    steps:
                                    [
                                        {
                                            formStepClasses: [
                                                'form__block--dialog',
                                            ],
                                            formTitleClasses: [
                                                'form__title--dialog',
                                            ],
                                            formInfoClasses: [
                                                'form__info--dialog',
                                            ],
                                            buttonContainerClasses: [
                                                'form__button-container--dialog',
                                            ],
                                            fieldContainerClasses: [
                                                'form__field-container--dialog',
                                            ],
                                            stepId: 'step0',
                                            formTitle: 'Изменить пароль',
                                            formInfo: 'Введите текущий и новый пароль',
                                            stepButtons: [
                                                componentHandler.generateComponentContext('btn', cancelClasses, {buttonText: textCancel}),
                                                componentHandler.generateComponentContext('btn', submitClasses, {buttonText: textSubmit, submitAction: actionUpdate}),
                                            ],
                                            fields: [
                                                {
                                                    id: 'username',
                                                    completion: 'email',
                                                    type: 'text',
                                                    classes: ['any--none'],
                                                },
                                                {
                                                    label: 'Текущий пароль',
                                                    labelClasses: [
                                                        'form__label--dialog',
                                                    ],
                                                    classes: [
                                                        'form__input--icon',
                                                        'form__input--dialog',
                                                    ],
                                                    placeholder: 'Ваш пароль',
                                                    type: 'password',
                                                    id: 'oldPassword',
                                                    completion: 'current-password',
                                                    minlength: 8,
                                                    maxlength: 32,
                                                    iconButton: {
                                                        classes: [
                                                            'form__button--icon',
                                                            'form__button--icon-dialog',
                                                        ],
                                                        id: 'pswdToggle2',
                                                    },
                                                },
                                                {
                                                    label: 'Новый пароль',
                                                    labelClasses: [
                                                        'form__label--dialog',
                                                    ],
                                                    classes: [
                                                        'form__input--icon',
                                                        'form__input--dialog',
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
                                                            'form__button--icon-dialog',
                                                        ],
                                                        id: 'pswdToggle3',
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
                navbar: {
                    linkButtons: [
                        {
                            classes: [
                                'form__button--navbar',
                            ],
                            spanClasses: [
                                'button__span--navbar',
                            ],
                            buttonImg: encodeURIComponent(profileImg),
                            id: 'navProfile',
                            buttonText: 'Профиль',
                        },
                        {
                            classes: [
                                'form__button--navbar',
                            ],
                            spanClasses: [
                                'button__span--navbar',
                            ],
                            buttonImg: encodeURIComponent(passwordImg),
                            id: 'navSecurity',
                            buttonText: 'Безопасность',
                        },
                    ],
                    actionButton: {
                        noErrors: 1,
                        classes: [
                            'form__button--navbar',
                            'form__button--logout',
                        ],
                        spanClasses: [
                            'button__span--navbar',
                        ],
                        buttonImg: encodeURIComponent(exitImg),
                        id: 'profileLogout',
                        buttonText: 'Выйти',
                        action: 'logout',
                    },
                },
            },
        };

        return profileTemplate(profileContext);
    }
    async controller() {
        this.subscribe();
        const profileHandler = new ProfileHandler();
        profileHandler.setup();
    }
}

export default Profile;
