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

    getInterests() {
        let items;
        authHandler.sendRequest('http://185.241.192.216:8080/registration').then(result => {items = result; console.log(items);});
        
        return items;
    }

    validateInput(type, input) {
        const expressions = {
            password: /^.{8,32}$/,
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            date: /^(?:(?:19[7-9]\d|20[0-1]\d|202[0-4])-(?:(?:0[13578]|1[02])-31|(?:0[1,3-9]|1[0-2])-(?:29|30)|02-29(?=\-((?:19[7-9]\d|20[0-1]\d|202[0-4])00|((?:19[7-9]\d|20[0-1]\d|202[0-4])(?:04|08|[2468][048]|[13579][26]))))|(?:0[1-9]|1[0-2])-0[1-9]|(?:0[13-9]|1[0-2])-1\d|(?:0[1-9]|1[0-2])-2[0-8]))$/,
            text: /^(?=.{2,32}$)[\p{L}]+$/u,
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

    setupEnterEvents() {
        const inputs = document.querySelectorAll('.form__input');
        for (const input of inputs) {
            const continueButton = this.nthAncestor(input, 4).querySelector('.form__button--continue');
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter'){
                    event.preventDefault();
                    continueButton.click();
                }
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
            if (this.nthAncestor(button, 2).id == '0') {
                button.style.display = 'none';
            };
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

        document.getElementById(this.currentStep).style.display = 'block';
    }

    setupErrorHandling() {
        const errorMessages = {
            'password': 'Некорректный пароль',
            'email': 'Некорректный email',
            'text': 'Некорректное имя',
            'date': 'Некорректная дата',
            'multipleChoiceError': 'Нужно что-то выбрать',
        };
        const helpMessages = {
            'password': 'Пароль должен быть длиной от 8 до 32 символов. Без emoji. Разрешены стандартные спецсимволы',
            'email': 'Формат email - example@mailservice.domain',
            'text': 'Имя не должно содержать специальных символов (и пробелов), длина 2-32 символа',
            'date': 'Дата в формате гггг-мм-дд, c 1970 по 2024',
            'login': 'Неверный логин или пароль',
            'registration': 'Что-то пошло не так',
        };
        const formBlocks = document.querySelectorAll('.form__block');
        const form = document.querySelector('.form')
        const formField = form.querySelectorAll('.form__input');
        const formError = document.querySelector('.form__error');
        for (const block of formBlocks) {
            const inputs = block.querySelectorAll('.form__input');
            const button = block.querySelector('.form__button--continue');
            let blockErr;
            button.addEventListener('click', () => {
                blockErr = false;

                const formErrorMessages = formError.querySelectorAll('p');
                for (const formErrorMessage of formErrorMessages) {
                    if (formError.style.display === 'block') {
                        formError.style.display = '';
                    }
                    formErrorMessage.remove();
                }

                for (const input of inputs) {
                    const errorField = this.nthAncestor(input, 1).querySelector('.field__error');
                    if (input.id === 'password') {
                        const passwordDisplayBtn = document.querySelector('.form__button--icon');
                        passwordDisplayBtn.style.background = 'var(--pswd--hidden)';
                        input.type = 'password';
                    }
                    const inputError = !this.validateInput(input.type, input.value);

                    let errorParagraph = errorField.querySelector('p') ?? null;
                    if (errorParagraph) {
                        errorParagraph.remove();
                    }
                    if (inputError) {
                        if (formError.style.display === ''){
                            formError.style.display = 'block';
                        }
                        errorParagraph = document.createElement('p');
                        errorParagraph.innerHTML = errorMessages[input.type];
                        errorField.appendChild(errorParagraph);

                        const helpParagraph = document.createElement('p');
                        helpParagraph.innerHTML = helpMessages[input.type];
                        formError.appendChild(helpParagraph);
                        blockErr = true;
                    }
                }

                const errorField = this.nthAncestor(button, 1).querySelector('.field__error');
                let errorParagraph = errorField.querySelector('p') ?? null;
                if (errorParagraph) {
                    errorParagraph.remove();
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
                            formData['gender'] = this.gender;
                        }
                        if (this.multipleChoice.length > 0) {
                            formData['choices'] = this.multipleChoice;
                        }
                        if (form.id == 'registration') {
                            authHandler.Register(formData).then((res) => {
                                const formErrorMessages = formError.querySelectorAll('p');
                                for (const formErrorMessage of formErrorMessages) {
                                    if (formError.style.display === 'block') {
                                        formError.style.display = '';
                                    }
                                    formErrorMessage.remove();
                                }

                                if (res === undefined) {
                                    if (formError.style.display === ''){
                                        formError.style.display = 'block';
                                    }
                                    const helpParagraph = document.createElement('p');
                                    helpParagraph.innerHTML = helpMessages['registration'];
                                    formError.appendChild(helpParagraph);
                                } else {
                                    window.location.replace("http://185.241.192.216:8081/main")
                                }
                            });
                        }
                        else if (form.id == 'login') {
                            authHandler.Login(formData).then((res) => {
                                const formErrorMessages = formError.querySelectorAll('p');
                                for (const formErrorMessage of formErrorMessages) {
                                    if (formError.style.display === 'block') {
                                        formError.style.display = '';
                                    }
                                    formErrorMessage.remove();
                                }

                                if (res === undefined) {
                                    if (formError.style.display === ''){
                                        formError.style.display = 'block';
                                    }
                                    const helpParagraph = document.createElement('p');
                                    helpParagraph.innerHTML = helpMessages['login'];
                                    formError.appendChild(helpParagraph);
                                } else {
                                    window.location.replace("http://185.241.192.216:8081/main")
                                }
                            });
                        }
                    }
                }
            });
        }
    }
}

export default FormHandler;
