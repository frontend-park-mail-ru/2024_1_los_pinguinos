import authHandler from "../../api/auth";
import router from "../../../index.js";

class FormHandler {
    constructor() {
        this.currentStep = 0;
        this.genderStep = 1;
        this.mcStep = 2;
        this.gender = null;
        this.multipleChoice = new Array();
        this.errorMessages = {
            'password': 'Некорректный пароль',
            'email': 'Некорректный email',
            'text': 'Некорректное имя',
            'date': 'Некорректная дата',
        };
        this.helpMessages = {
            'password': '• Пароль должен быть длиной от 8 до 32 символов. Без emoji. Разрешены стандартные спецсимволы',
            'email': '• Формат email - example@mailservice.domain',
            'text': '• Имя не должно содержать специальных символов (и пробелов), длина 2-32 символа',
            'date': '• Дата в формате вашей системы, c 1970 по 2008',
            'login': '• Неверный логин или пароль',
            'registration': '• Что-то пошло не так',
            'multipleChoice': '• Выберите хотя бы один интерес',
            'genderChoice': '• Выберите пол',
        };
    }

    async getInterests() {
        return await authHandler.sendRequest(authHandler.registrationURL);
    }

    validateInput(type, input) {
        const expressions = {
            password: /^.{8,32}$/,
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            date: /^(?:(?:19[6-9]\d|200[0-8])-(?:(?:0[13578]|1[02])-31|(?:0[1,3-9]|1[0-2])-(?:29|30)|02-29(?=\-((?:19[6-9]\d|200[0-8])00|((?:19[6-9]\d|200[0-8])(?:04|08|[2468][048]|[13579][26]))))|(?:0[1-9]|1[0-2])-0[1-9]|(?:0[13-9]|1[0-2])-1\d|(?:0[1-9]|1[0-2])-2[0-8]))$/,
            text: /^(?=.{2,32}$)[\p{L}]+$/u,
            emoji: /[\uD800-\uDFFF]/,
        };
        const regexExpression = expressions[type];
        const regexEmoji = expressions['emoji'];

        return regexExpression.test(input) && !regexEmoji.test(input);
    }

    formForward() {
        const currentFormStep = document.getElementById(`step${this.currentStep}`);
        const nextFormStep = document.getElementById(`step${(this.currentStep + 1)}`);
        if (nextFormStep) {
            this.currentStep++;
            currentFormStep.classList.toggle('form__block--hidden');
            setTimeout(() => {
                currentFormStep.style.display = 'none';
                nextFormStep.style.display = 'block';
            }, 200);
            setTimeout(() => {
                nextFormStep.classList.toggle('form__block--hidden');
            }, 225);
        }
    }

    formBackward() {
        const currentFormStep = document.getElementById(`step${this.currentStep}`);
        const prevFormStep = document.getElementById(`step${(this.currentStep - 1)}`);
        if (prevFormStep) {
            const formErrF = document.querySelector('.form__error');
            const formInputs = currentFormStep.querySelectorAll('.form__input');
            for (const input of formInputs) {
                this.removeErrorMsg(formErrF, input.id + 'Msg', 200);
                this.removeErrorMsg(input.closest('.form__field').querySelector('.field__error'), input.id + 'Err', 200);
            }
            this.removeErrorMsg(formErrF, 'genderMsg', 200);
            this.removeErrorMsg(formErrF, 'multipleChoiceMsg', 200);
            this.currentStep--;
            currentFormStep.classList.toggle('form__block--hidden');
            setTimeout(() => {
                currentFormStep.style.display = 'none';
                prevFormStep.style.display = 'block';
            }, 200);
            setTimeout(() => {
                prevFormStep.classList.toggle('form__block--hidden');
            }, 225);
        }
    }

    addErrorMsg(container, errId, errType, errMsgs) {
        const oldErrPs = container.querySelectorAll('p');
        for (const errP of oldErrPs) {
            if (errP.id === errId) {
                return false;
            }
        }
        const newErrP = document.createElement('p');
        newErrP.innerHTML = errMsgs[errType];
        newErrP.id = errId;
        container.appendChild(newErrP);
        if (container.classList.contains('form__block--hidden')){
            container.classList.toggle('form__block--hidden');
        }

        return true;
    }

    removeErrorMsg(container, errId, animationTime) {
        const oldErrPs = container.querySelectorAll('p');
        for (const errP of oldErrPs) {
            if (errP.id === errId) {
                errP.classList.toggle('form__block--hidden');
                if (!container.classList.contains('form__block--hidden') && oldErrPs.length === 1) {
                    container.classList.toggle('form__block--hidden');
                }
                setTimeout(() => {
                    errP.remove();
                }, animationTime);

                return true;
            }
        }

        return false;
    }

    inputErrorHandler(formInput) {
        const passwordDisplayBtn = document.querySelector('.form__button--icon');
        const passwordField = document.querySelector('#password');
        if (passwordField.type == 'text') {
            passwordField.type = 'password';
            passwordDisplayBtn.style.background = 'var(--pswd--hidden)';
        }
        const errF = formInput.closest('.form__field').querySelector('.field__error');
        const formErrF = document.querySelector('.form__error');
        const errId = formInput.id + 'Err';
        const msgId = formInput.id + 'Msg';
        if (!this.validateInput(formInput.type, formInput.value)) {
            this.addErrorMsg(errF, errId,formInput.type, this.errorMessages);
            this.addErrorMsg(formErrF, msgId, formInput.type, this.helpMessages);

            return true;
        }
        this.removeErrorMsg(errF, errId, 200);
        this.removeErrorMsg(formErrF, msgId, 200);
        
        return false;
    }

    formStepErrorHandler(formStep) {
        const formStepInputs = formStep.querySelectorAll('.form__input');
        let formOk = true;
        for (const input of formStepInputs) {
            const res = !this.inputErrorHandler(input);
            formOk = formOk && res;
        }
        return formOk;
    }

    formSubmit(form) {
        const formInputs = form.querySelectorAll('.form__input');
        const formErrF = form.querySelector('.form__error');
        let formData = {};
        for (const input of formInputs) {
            formData[input.id] = input.value;
        }
        if (this.gender) {
            formData['gender'] = this.gender;
        }
        if (this.multipleChoice.length > 0) {
            formData['choices'] = this.multipleChoice;
        }
        if (form.id == 'registration') {
            this.removeErrorMsg(formErrF, 'registrationMsg', 200);
            authHandler.Register(formData).then((res) => {
                if (res === undefined) {
                    this.addErrorMsg(formErrF, 'registrationMsg', 'registration', this.helpMessages);
                } else {
                    router.navigateTo('/main');
                }
            });
        }
        else if (form.id == 'login') {
            this.removeErrorMsg(formErrF, 'loginMsg', 200);
            authHandler.Login(formData).then((res) => {
                if (res === undefined) {
                    this.addErrorMsg(formErrF, 'loginMsg', 'login', this.helpMessages);
                } else {
                    router.navigateTo('/main');
                }
            });
        }
    }

    inputEnterHandler (formInput, event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const nextFormInputAncestor = (formInput.closest('.form__field').nextElementSibling || 
            formInput.closest('.form__input-container').nextElementSibling);
            const nextFormInput = nextFormInputAncestor.querySelector('.form__input');
            if (!nextFormInput) {
                const continueButton = formInput.closest('.form__block').querySelector('.form__button--continue');
                const nextBlock = formInput.closest('.form__block').nextElementSibling;
                continueButton.click();

                if (nextBlock) {
                    const nextBlockFirstInput = nextBlock.querySelectorAll('.form__input')[0];
                    if (nextBlockFirstInput) {
                        setTimeout(() => {
                            if (this.currentStep == (`step${nextBlock.id}`))
                            {
                                nextBlockFirstInput.focus();
                            }
                        }, 200);
                    }
                }
            } else {
                if (!this.inputErrorHandler(formInput)) {
                    nextFormInput.focus();
                }
            }
        }
    }

    setupEnterEvents() {
        const inputs = document.querySelectorAll('.form__input');
        for (const input of inputs) {
            input.addEventListener('keypress', (event) => {
                this.inputEnterHandler(input, event);
            });
        }
    }

    setupCheckboxes() {
        const checkboxes = document.querySelectorAll('.form__button--checkbox');
        const roundCheckboxes = document.querySelectorAll('.form__button--round');
        const roundCheckboxesArray = Array.from(roundCheckboxes);
        for (const checkbox of checkboxes){
            checkbox.addEventListener('click', () => {
                if (roundCheckboxesArray.includes(checkbox)) {
                    if (this.gender === checkbox.textContent) {
                        this.gender = null;
                    } else {
                        this.gender = checkbox.textContent;
                    }
                    for (const singleCheckbox of roundCheckboxes){
                        if (singleCheckbox !== checkbox && singleCheckbox.classList.contains('form__button--checkbox-selected')) {
                            singleCheckbox.classList.toggle('form__button--checkbox-selected');
                        }
                    }
                }
                checkbox.classList.toggle('form__button--checkbox-selected');
                if (!roundCheckboxesArray.includes(checkbox)) {
                    if (!this.multipleChoice.includes(checkbox.id)) {
                        this.multipleChoice.push(checkbox.id);
                    } else {
                        this.multipleChoice.splice(this.multipleChoice.indexOf(checkbox.id), 1);
                    }
                }
            });
        }
    }

    setupDisplay() {
        const navigationButtons = document.getElementsByClassName('form__button--nav');
        const formErrF = document.querySelector('.form__error');
        for (const button of navigationButtons) {
            const blockElement = button.closest('.form__block');
            if (blockElement.id === 'step0') {
                button.style.display = 'none';
            } else {
                blockElement.classList.toggle('form__block--hidden');
            };
            button.addEventListener('click', () => {
                if (!formErrF.classList.contains('form__block--hidden')) {
                    formErrF.classList.toggle('form__block--hidden');
                }
                this.formBackward();
            });
        }

        const passwordDisplayBtn = document.querySelector('.form__button--icon');
        const passwordField = document.querySelector('#password');
        passwordDisplayBtn.addEventListener('click', () => {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                passwordDisplayBtn.style.background = 'var(--pswd--visible)';
            }
            else {
                passwordField.type = 'password';
                passwordDisplayBtn.style.background = 'var(--pswd--hidden)';
            }
        });
        document.getElementById(`step${this.currentStep}`).style.display = 'block';
    }

    setupErrorHandling() {
        const form = document.querySelector('.form');
        const formBlocks = form.querySelectorAll('.form__block');
        const formErrF = document.querySelector('.form__error');
        for (const block of formBlocks) {
            const button = block.querySelector('.form__button--continue');
            button.addEventListener('click', () => {
                let blockOk = this.formStepErrorHandler(block);

                if (this.gender === null && (this.currentStep === this.genderStep)) {
                    this.addErrorMsg(formErrF, 'genderMsg', 'genderChoice', this.helpMessages);
                    blockOk = false;
                }
                if (this.multipleChoice.length < 1 && (this.currentStep === this.mcStep)) {
                    this.addErrorMsg(formErrF, 'multipleChoiceMsg', 'multipleChoice', this.helpMessages);
                    blockOk = false;
                }

                if (blockOk){
                    this.removeErrorMsg(formErrF, 'genderMsg', 200);
                    this.removeErrorMsg(formErrF, 'multipleChoiceMsg', 200);
                    if (button.id !=='submit') {
                        this.formForward();
                    }
                    else {
                        this.formSubmit(form);
                    }
                }
            });
        }
    }
}

export default FormHandler;
