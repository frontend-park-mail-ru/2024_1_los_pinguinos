import apiHandler from '../../api/apiHandler.js';
import router from '../../../index.js';
import storage from '../../models/storage/storage.js';

let pictureContainers = null;
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image.jpg'];
/**
 * Form handler class. It handles forms o_o
 * @class
 */
class FormHandler {
    /**
     * Creates instance of class formHandler.
     */
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
            'email': '• Формат email - example@mailservice.domain, длина до 320 символов',
            'text': '• Имя не должно содержать специальных символов (и пробелов), длина 2-32 символа',
            'date': '• Дата в формате вашей системы, c 1970 по 2008',
            'login401': '• Неверный логин или пароль',
            'registration401': '• Такой email уже зарегистрирован',
            'multipleChoice': '• Выберите хотя бы один интерес',
            'genderChoice': '• Выберите пол',
        };
    }
    /**
     * Validates input according to predefined regex parameters.
     * @function
     * @param {string} type - input type
     * @param {HTMLElement} input - the input itself
     * @returns {boolean} - regex validation result
     */
    validateInput(type, input) {
        const expressions = {
            password: /^.{8,32}$/,
            email: /^(?=.{1,320}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            date: /^(?:(?:19[6-9]\d|200[0-8])-(?:(?:0[13578]|1[02])-31|(?:0[1,3-9]|1[0-2])-(?:29|30)|02-29(?=-((?:19[6-9]\d|200[0-8])00|((?:19[6-9]\d|200[0-8])(?:04|08|[2468][048]|[13579][26]))))|(?:0[1-9]|1[0-2])-0[1-9]|(?:0[13-9]|1[0-2])-1\d|(?:0[1-9]|1[0-2])-2[0-8]))$/,
            text: /^(?=.{2,32}$)[\p{L}]+$/u,
            emoji: /^[\x20-\x7E]+$/,
        };
        const regexExpression = expressions[type];
        const regexEmoji = expressions['emoji'];
        if (type === 'text'){
            return regexExpression.test(input);
        }

        return regexExpression.test(input) && regexEmoji.test(input);
    }
    /**
     * Makes next step of multistep form visible.
     * @function
     */
    formForward(form) {
        const currentFormStep = form.querySelector(`#step${this.currentStep}`);
        const nextFormStep = form.querySelector(`#step${(this.currentStep + 1)}`);
        if (nextFormStep) {
            this.currentStep++;
            currentFormStep.classList.toggle('any--hidden');
            setTimeout(() => {
                currentFormStep.style.display = 'none';
                nextFormStep.style.display = 'block';
            }, 200);
            setTimeout(() => {
                nextFormStep.classList.toggle('any--hidden');
            }, 225);
        }
    }
    /**
     * Makes previous step of multistep form visible.
     * @function
     */
    formBackward(form) {
        const currentFormStep = form.querySelector(`#step${this.currentStep}`);
        const prevFormStep = form.querySelector(`#step${(this.currentStep - 1)}`);
        if (prevFormStep) {
            const formErrF = form.querySelector('.form__error');
            const formInputs = currentFormStep.querySelectorAll('.form__input');
            for (const input of formInputs) {
                if (formErrF) {
                    this.removeErrorMsg(formErrF, input.id + 'Msg', 200);
                }
                this.removeErrorMsg(input.closest('.form__field').querySelector('.field__error'), input.id + 'Err', 200);
            }
            if (formErrF) {
                this.removeErrorMsg(formErrF, 'genderMsg', 200);
                this.removeErrorMsg(formErrF, 'multipleChoiceMsg', 200);
            }
            this.currentStep--;
            currentFormStep.classList.toggle('any--hidden');
            setTimeout(() => {
                currentFormStep.style.display = 'none';
                prevFormStep.style.display = 'block';
            }, 200);
            setTimeout(() => {
                prevFormStep.classList.toggle('any--hidden');
            }, 225);
        }
    }
    /**
     * Adds error message to specified container.
     * @function
     * @param {HTMLElement} container - specified container
     * @param {string} errId - id of element to be created
     * @param {string} errType - type of invalid input
     * @param {Object.<string, string>} errMsgs - map of error messages (newly created element's content)
     * @returns {boolean} - returns true if error was added, false otherwise
     */
    addErrorMsg(container, errId, errType, errMsgs) {
        const oldErrPs = container.querySelectorAll('p');
        for (const errP of oldErrPs) {
            if (errP.id === errId) {
                return false;
            }
        }
        const newErrP = document.createElement('p');
        newErrP.classList.add('form__paragraph--error');
        newErrP.innerHTML = errMsgs[errType];
        newErrP.id = errId;
        container.appendChild(newErrP);
        if (container.classList.contains('any--hidden')){
            container.classList.toggle('any--hidden');
        }

        return true;
    }
    /**
     * Removes error message from specified container.
     * @function
     * @param {HTMLElement} container - specified container
     * @param {string} errId - id of element to be removed
     * @param {number} animationTime - time in ms before removing the element
     * @returns {boolean} - returns true if error was removed, false otherwise
     */
    removeErrorMsg(container, errId, animationTime) {
        const oldErrPs = container.querySelectorAll('p');
        for (const errP of oldErrPs) {
            if (errP.id === errId) {
                errP.classList.toggle('any--hidden');
                setTimeout(() => {
                    const newErrPs = container.querySelectorAll('p');
                    if (!container.classList.contains('any--hidden') && newErrPs.length === 1) {
                        container.classList.toggle('any--hidden');
                    }
                    errP.remove();
                }, animationTime);

                return true;
            }
        }

        return false;
    }
    /**
     * Validates input and adds/removes an error message depending on result.
     * @function
     * @param {HTMLElement} formInput - the input itself
     * @returns {boolean} - returns true if errors were encountered, false otherwise
     */
    inputErrorHandler(formInput) {
        const form = formInput.closest('.form');

        const passwordDisplayBtns = form.querySelectorAll('.form__button--icon');
        for (const passwordDisplayBtn of passwordDisplayBtns) {
            const passwordField = passwordDisplayBtn.closest('.form__field');
            const passwordInput = passwordField.querySelector('.form__input');
            if (passwordInput.type === 'text') {
                passwordInput.type = 'password';
                passwordDisplayBtn.style.background = 'var(--pswd--hidden)';
            }
        }
        const errF = formInput.closest('.form__field').querySelector('.field__error');
        const formErrF = form.querySelector('.form__error');
        const errId = formInput.id + 'Err';
        const msgId = formInput.id + 'Msg';
        if (!this.validateInput(formInput.type, formInput.value)) {
            this.addErrorMsg(errF, errId,formInput.type, this.errorMessages);
            if (formErrF) {
                this.addErrorMsg(formErrF, msgId, formInput.type, this.helpMessages);
            }

            return true;
        }
        this.removeErrorMsg(errF, errId, 200);
        if (formErrF) {
            this.removeErrorMsg(formErrF, msgId, 200);
        }

        return false;
    }
    /**
     * Validates form step and returns validation result.
     * @function
     * @param {HTMLElement} formStep - the form step itself
     * @returns {boolean} - returns form step validation result, true if ok
     */
    formStepErrorHandler(formStep) {
        const formStepInputs = formStep.querySelectorAll('.form__input');
        let formOk = true;
        for (const input of formStepInputs) {
            const res = !this.inputErrorHandler(input);
            formOk = formOk && res;
        }

        return formOk;
    }
    closeDialog(dialog) {
        dialog.classList.toggle('any--hidden');
        setTimeout(() => {
            dialog.close();
        }, 200);
    }
    openDialog(dialog) {
        dialog.showModal();
        dialog.classList.toggle('any--hidden');
    }
    handleDialog(form, result) {
        const dialog = form.closest('dialog');
        const updatedBlock = form.closest('.profile__content-block');
        let baseBackground;
        if (updatedBlock) {
            baseBackground = updatedBlock.style.background;
        }
        if (dialog) {
            this.closeDialog(dialog);
        }
        setTimeout(() => {
            if (result !== 200) {
                updatedBlock.style.background = 'var(--action-bgr--failure)';
            } else {
                updatedBlock.style.background = 'var(--action-bgr--success)';
            }
        }, 400);
        setTimeout(() => {
            updatedBlock.style.background = baseBackground;
        }, 800);
    }
    updateData(form, formData, result) {
        if (result === 200) {
            const updatedContainer = form.closest('.profile__settings--row') || form.closest('.profile__content-block');
            if (!updatedContainer) {
                return;
            }

            let updatedElement;
            if (updatedContainer.classList.contains('profile__content-block')) {
                updatedElement = (updatedContainer.querySelector('.profile__text') ||
                updatedContainer.querySelector('.profile__item-container'));
            } else {
                updatedElement = updatedContainer.querySelectorAll('.profile__text')[1];
            }

            if (!updatedElement) {
                updatedElement = document.createElement('p');
                updatedElement.classList.add('profile__text');
                updatedElement.innerText = formData['description'];
                updatedContainer.appendChild(updatedElement);

                return;
            }

            if (updatedElement.classList.contains('profile__item-container')) {
                const items = updatedElement.querySelectorAll('.form__button--inactive');
                for (const item of items) {
                    item.remove();
                }
                const updatedChoices = form.querySelectorAll('.form__button--checkbox-selected');
                for (const interest of updatedChoices) {
                    const item = interest.cloneNode(true);
                    item.id = 'user' + item.id;
                    item.classList.remove('form__button--checkbox-selected');
                    item.classList.add('form__button--inactive');
                    updatedElement.appendChild(item);
                }

                return;
            }

            let content = formData['description'] || formData['name'] || formData['email'];
            if (content) {
                const formInput = form.querySelector('.form__input');
                if (formInput) {
                    if (formInput.id !== 'email') {
                        formInput.placeholder = content;
                    }
                    else {
                        content = content.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2');
                    }
                }
                updatedElement.textContent = content;
            }
            const formInputs = form.querySelectorAll('.form__input');
            for (const input of formInputs) {
                if (!input.classList.contains('.form__textarea')) {
                    input.value = null;
                }
            }
        }

        return;
    }
    /**
     * Submits a form.
     * @function
     * @param {HTMLElement} form - the form itself
     */
    formSubmit(form, submitAction) {
        const formInputs = form.querySelectorAll('.form__input, .form__textarea');
        const formErrF = form.querySelector('.form__error');
        const formData = {};
        if (formErrF) {
            this.removeErrorMsg(formErrF, 'loginMsg', 200);
            this.removeErrorMsg(formErrF, 'registrationMsg', 200);
        }
        for (const input of formInputs) {
            formData[input.id.trim()] = input.value;
        }
        if (this.gender) {
            formData['gender'] = this.gender;
        }
        if (this.multipleChoice.length > 0) {
            formData['interests'] = this.multipleChoice;
        }
        if (submitAction === 'register') {
            apiHandler.Register(formData).then((res) => {
                if (res !== 200) {
                    this.addErrorMsg(formErrF, 'registrationMsg', `registration${res}`, this.helpMessages);
                } else {
                    router.redirectTo('/main');
                }
            });
        }
        else if (submitAction === 'login') {
            apiHandler.Login(formData).then((res) => {
                if (res !== 200) {
                    this.addErrorMsg(formErrF, 'loginMsg', `login${res}`, this.helpMessages);
                } else {
                    router.redirectTo('/main');
                }
            });
        }
        else if (submitAction === 'updateProfile') {
            apiHandler.UpdateProfile(formData).then((res) => {
                this.handleDialog(form, res);
                this.updateData(form, formData, res);
                storage.user.Update(formData);
            });
        }
        else if (submitAction === 'deleteProfile') {
            apiHandler.DeleteProfile().then((res) => {
                if (res === 200) {
                    router.redirectTo('/');
                }
            });
        }
    }
    /**
     * Handles 'Enter' key press on form input.
     * @function
     * @param {HTMLElement} formInput - the input itself
     * @param {KeyboardEvent} event - key press event
     */
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
                            if (`step${this.currentStep}` === nextBlock.id)
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
    /**
     * Adds 'Enter' key press event listeners on form inputs.
     * @function
     */
    setupEnterEvents(form) {
        const inputs = form.querySelectorAll('.form__input');
        for (const input of inputs) {
            input.addEventListener('keypress', (event) => {
                this.inputEnterHandler(input, event);
            });
        }
    }
    static async handleFileUpload(file, container) {
        if (!pictureContainers) {
            const pictureBlock = container.closest('.profile__picture-block');
            pictureContainers = Array.from(pictureBlock.querySelectorAll('.profile__picture-container'));
        }
        const containerId = pictureContainers.indexOf(container);
        if (acceptedFileTypes.includes(file.type)) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('cell', containerId);

            const actionButton = container.querySelector('.form__button');
            actionButton.style.display = 'none';

            const loader = document.createElement('div');
            loader.classList.add('loader');
            container.appendChild(loader);

            const response = await apiHandler.UploadImage(formData);
            const photoURL = await response.json();

            if (response.ok) {
                actionButton.classList.toggle('form__button--create');
                actionButton.classList.toggle('form__button--remove');
                actionButton.removeEventListener('click', FormHandler.handleFileInput);
                actionButton.addEventListener('click', FormHandler.handleFileDelete);
                const photo = document.createElement('img');
                photo.classList.add('profile__picture');
                photo.src = photoURL;
                storage.user.UpdatePicture(containerId, photoURL);

                photo.onload= () => {
                    container.appendChild(photo);
                    loader.remove();
                    actionButton.style.display = 'block';
                    const nextElement = container.nextElementSibling;
                    if (nextElement) {
                        const nextInput = nextElement.querySelector('.form__button');
                        if (nextInput.classList.contains('form__button--inactive')) {
                            nextInput.classList.toggle('form__button--inactive');
                            nextInput.classList.toggle('form__button--disabled');
                        }
                    }
                };

                return;
            }
            loader.remove();
            actionButton.style.display = 'block';
        }
    }
    static handleFileInput(event) {
        document.activeElement.blur();
        const fileContainer = event.target.closest('.profile__picture-container');
        const uploadInput = fileContainer.querySelector('.form__input--file');
        uploadInput.click();
    }
    static handleFile(event) {
        const uploadInput = event.target;
        if (uploadInput.files.length !== 1) {
            return;
        }
        const file = uploadInput.files[0];
        uploadInput.value = null;
        FormHandler.handleFileUpload(file, uploadInput.closest('.profile__picture-container'));
    }
    static async handleFileDelete(event) {
        const fileContainer = event.target.closest('.profile__picture-container');
        if (!pictureContainers) {
            const pictureBlock = fileContainer.closest('.profile__picture-block');
            pictureContainers = Array.from(pictureBlock.querySelectorAll('.profile__picture-container'));
        }
        const containerId = pictureContainers.indexOf(fileContainer);
        const response = await apiHandler.DeleteImage({'cell': `${containerId}`});

        if (response === 200) {
            const actionButton = fileContainer.querySelector('.form__button');
            actionButton.style.display = 'none';
            actionButton.classList.toggle('form__button--create');
            actionButton.classList.toggle('form__button--remove');
            actionButton.removeEventListener('click', FormHandler.handleFileDelete);
            actionButton.addEventListener('click', FormHandler.handleFileInput);
            storage.user.UpdatePicture(containerId, null);

            const pictureBlock = fileContainer.closest('.profile__picture-block');
            const createBtns = pictureBlock.querySelectorAll('.form__button--create');
            const allowedBtn = createBtns[0];
            for (const btn of createBtns) {
                if (btn !== allowedBtn && !btn.classList.contains('form__button--disabled')) {
                    btn.classList.toggle('form__button--inactive');
                    btn.classList.toggle('form__button--disabled');
                }
            }

            const photo = fileContainer.querySelector('.profile__picture');
            photo.remove();
            actionButton.style.display = 'block';
            document.activeElement.blur();

            return;
        }

    }
    setupFileUploads(container) {
        const uploadButtons = container.querySelectorAll('.form__button--create');
        const deleteButtons = container.querySelectorAll('.form__button--remove');
        const uploadInputs = container.querySelectorAll('.form__input--file');
        for (const btn of uploadButtons) {
            btn.addEventListener('click', FormHandler.handleFileInput);
        }
        for (const btn of deleteButtons) {
            btn.addEventListener('click', FormHandler.handleFileDelete);
        }
        for (const input of uploadInputs) {
            input.addEventListener('change', FormHandler.handleFile);
        }
    }
    /**
     * Sets up form's checkboxes, makes them clickable and tracks their state
     * @function
     */
    setupCheckboxes(form) {
        const checkboxes = form.querySelectorAll('.form__button--checkbox');
        const roundCheckboxes = form.querySelectorAll('.form__button--round');
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
                    const val = checkbox.querySelector('.button__span').innerText;
                    if (!this.multipleChoice.includes(val)) {
                        this.multipleChoice.push(val);
                    } else {
                        this.multipleChoice.splice(this.multipleChoice.indexOf(val), 1);
                    }
                }
            });
        }
    }
    /**
     * Sets up event listeners to enable form interactions.
     * @function
     */
    setupDisplay(form) {
        if (form.id) {
            this.setupCheckboxes(form);
            this.setupEnterEvents(form);

            const navigationButtons = form.getElementsByClassName('form__button--nav');
            const formErrF = form.querySelector('.form__error');
            for (const button of navigationButtons) {
                const blockElement = button.closest('.form__block');
                if (blockElement.id === 'step0') {
                    button.addEventListener('click', () => {
                        history.back();
                    });
                } else {
                    blockElement.classList.toggle('any--hidden');
                }
                button.addEventListener('click', () => {
                    if (!formErrF.classList.contains('any--hidden')) {
                        formErrF.classList.toggle('any--hidden');
                    }
                    this.formBackward(form);
                });
            }

            const passwordDisplayBtns = form.querySelectorAll('.form__button--icon');
            for (const passwordDisplayBtn of passwordDisplayBtns) {
                const passwordField = passwordDisplayBtn.closest('.form__field');
                const passwordInput = passwordField.querySelector('.form__input');
                passwordDisplayBtn.addEventListener('click', () => {
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text';
                        passwordDisplayBtn.style.background = 'var(--pswd--visible)';
                    }
                    else {
                        passwordInput.type = 'password';
                        passwordDisplayBtn.style.background = 'var(--pswd--hidden)';
                    }
                });
            }
            form.querySelector(`#step${this.currentStep}`).style.display = 'block';

            const formBlocks = form.querySelectorAll('.form__block');
            for (const block of formBlocks) {
                const button = block.querySelector('.form__button--continue');
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    let blockOk = this.formStepErrorHandler(block);

                    if (this.gender === null && (this.currentStep === this.genderStep)) {
                        this.addErrorMsg(formErrF, 'genderMsg', 'genderChoice', this.helpMessages);
                        blockOk = false;
                    }
                    if (this.multipleChoice.length < 1 && (this.currentStep === this.mcStep || form.id === 'interestsDialog')) {
                        if (formErrF) {
                            this.addErrorMsg(formErrF, 'multipleChoiceMsg', 'multipleChoice', this.helpMessages);
                        }
                        blockOk = false;
                    }

                    if (blockOk){
                        if (formErrF) {
                            this.removeErrorMsg(formErrF, 'genderMsg', 200);
                            this.removeErrorMsg(formErrF, 'multipleChoiceMsg', 200);
                        }
                        const submitAction = button.getAttribute('submit');
                        if (!submitAction) {
                            this.formForward(form);
                        }
                        else {
                            this.formSubmit(form, submitAction);
                        }
                    }
                });
            }
        }
    }
}

export default FormHandler;
