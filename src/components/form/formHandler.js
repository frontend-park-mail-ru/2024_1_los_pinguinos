import AuthHandler from "../../api/auth";

const authHandler = new AuthHandler();

class FormHandler {
    constructor() {
        this.currentStep = 0;
        this.genderStep = 1;
        this.mcStep = 2;
        this.gender = null;
        this.multipleChoice = new Array();
    }

    validateInput(type, input) {
        const expressions = {
            password: /^.{8,32}$/,
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
            text: /^[\p{L} ',-]+$/u,
            emoji: /[\uD800-\uDFFF]/,
        }
        const regexExpression = expressions[type];
        const regexEmoji = expressions['emoji'];
    
        return regexExpression.test(input) && !regexEmoji.test(input);
    }

    nthAncestor(element, n) {
        let result = element;
        for (let i = 0; i < n; i++){
            result = result.parentNode;
        }
        return result;
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
                if (!this.multipleChoice.includes(checkbox.id) && !roundCheckboxesArray.includes(checkbox)) {
                    this.multipleChoice.push(checkbox.id);
                } else {
                    this.multipleChoice.splice(this.multipleChoice.indexOf(checkbox.id), 1);
                }
            });
        }
    }

    setupDisplay() {
        const navigationButtons = document.getElementsByClassName('form__button--nav');
        for (const button of navigationButtons) {
            button.addEventListener('click', () => {
                const currentFormStep = document.getElementById(this.currentStep);
                const prevFormStep = document.getElementById(this.currentStep - 1);
                if (prevFormStep) {
                    this.currentStep--;
                    currentFormStep.style.display = 'none';
                    prevFormStep.style.display = 'block';
                }
            });
        }

        const passwordDisplayBtn = document.querySelector('.form__button--icon');
        const passwordField = document.querySelector('#Password');
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

        document.getElementById(this.currentStep).style.display = 'block';
    }

    setupErrorHandling() {
        const errorMessages = {
            'password': 'Некорректный пароль',
            'email': 'Некорректный email',
            'text': 'Некорректное имя',
            'date': 'Некорректная дата',
            'multipleChoiceError': 'Нужно что-то выбрать',
            'backendError': 'Что-то пошло не так'
        }
        const formBlocks = document.querySelectorAll('.form__block');
        const form = document.querySelector('.form')
        const formField = form.querySelectorAll('.form__input');
        for (const block of formBlocks) {
            const inputs = block.querySelectorAll('.form__input');
            const button = block.querySelector('.form__button--continue');
            let blockErr;
            button.addEventListener('click', () => {
                blockErr = false;
                for (const input of inputs) {
                    const errorField = this.nthAncestor(input, 1).querySelector('.field__error');
                    if (input.id === 'Password') {
                        const passwordDisplayBtn = document.querySelector('.form__button--icon');
                        passwordDisplayBtn.style.background = 'var(--pswd--hidden)';
                        input.type = 'password';
                    }
                    const inputError = !this.validateInput(input.type, input.value);
                    let errorParagraph = errorField.querySelector('p') ?? null;
                    if (errorParagraph) {
                        errorField.removeChild(errorParagraph);
                    }
                    if (inputError) {
                        errorParagraph = document.createElement('p');
                        errorParagraph.innerHTML = errorMessages[input.type];
                        errorField.appendChild(errorParagraph);
                        blockErr = true;
                    }
                }

                const errorField = this.nthAncestor(button, 1).querySelector('.field__error');
                let errorParagraph = errorField.querySelector('p') ?? null;
                if (errorParagraph) {
                    errorField.removeChild(errorParagraph);
                }
                if (this.gender === null && (this.currentStep === this.genderStep) || 
                    (this.multipleChoice.length < 1 && this.currentStep == this.mcStep)) {
                    errorParagraph = document.createElement('p');
                    errorParagraph.innerHTML = errorMessages['multipleChoiceError'];
                    errorField.appendChild(errorParagraph);
                    blockErr = true;
                }
                if (!blockErr){
                    if (button.id !=='submit') {
                        const currentFormStep = document.getElementById(this.currentStep);
                        const nextFormStep = document.getElementById(this.currentStep + 1);
                        if (nextFormStep) {
                            this.currentStep++;
                            currentFormStep.style.display = 'none';
                            nextFormStep.style.display = 'block';
                        }
                    }
                    else {
                        let formData = {}
                        for (const input of formField){
                            formData[input.id] = input.value;
                        }
                        if (this.gender) {
                            formData['Gender'] = this.gender;
                        }
                        if (this.multipleChoice.length > 0) {
                            formData['Choices'] = this.multipleChoice;
                        }
                        console.log(formData);
                        if (form.id == 'registration') {
                            authHandler.Register(formData);
                        }
                        else if (form.id == 'login') {
                            authHandler.Login(formData);
                        }
                    }
                }
            });
        }
    }
}

export default FormHandler;
