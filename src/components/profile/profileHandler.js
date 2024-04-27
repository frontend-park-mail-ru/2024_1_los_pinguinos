import FormHandler from '../form/formHandler';
/**
 * Profile handler class
 * @class
 */
class ProfileHandler {
    /** Creates instance of class ProfileHandler.
     */
    constructor() {
        this.state = 0;
    }
    /**
     * Sets up all event listeners for profile elemens (not decomposed, bad architecture)...
     * @function
     */
    setup() {
        const formHandler = new FormHandler();
        const navbar = document.querySelector('.profile__navbar-content');
        const navbarButtons = navbar.querySelectorAll('.form__button--navbar');
        navbarButtons[this.state].classList.toggle(
            'form__button--navbar-selected'
        );
        for (const btn of navbarButtons) {
            btn.setAttribute('stateId', this.state++);
        }
        this.state = 0;
        const contentBlocks = document.querySelectorAll(
            '.profile__block-group'
        );
        if (contentBlocks) {
            for (const block of contentBlocks) {
                block.setAttribute('stateId', this.state++);
                block.classList.toggle('any--hidden');
                block.style.display = 'none';
            }
            this.state = 0;
            contentBlocks[this.state].classList.toggle('any--hidden');
            contentBlocks[this.state].style.display = 'flex';
            const blockTitle = document.querySelector('#blockTitle');
            for (const btn of navbarButtons) {
                if (!btn.getAttribute('data-action')) {
                    btn.addEventListener('click', () => {
                        const newState = btn.getAttribute('stateId');
                        const oldState = this.state;
                        navbarButtons[this.state].classList.toggle(
                            'form__button--navbar-selected'
                        );
                        contentBlocks[this.state].classList.toggle(
                            'any--hidden'
                        );
                        blockTitle.classList.toggle('any--hidden');
                        setTimeout(() => {
                            contentBlocks[oldState].style.display = 'none';
                            contentBlocks[newState].style.display = 'flex';
                        }, 200);
                        setTimeout(() => {
                            contentBlocks[newState].classList.toggle(
                                'any--hidden'
                            );
                            blockTitle.innerHTML =
                                contentBlocks[newState].getAttribute('title');
                            blockTitle.classList.toggle('any--hidden');
                        }, 205);
                        this.state = newState;
                        btn.classList.toggle('form__button--navbar-selected');
                    });
                }
            }
            const editBtns = document.querySelectorAll('.form__button--edit');
            for (const btn of editBtns) {
                const dialog = btn.parentNode.querySelector('dialog');
                dialog.addEventListener('click', (event) => {
                    const rect = dialog.getBoundingClientRect();
                    const isInDialog =
                        rect.top <= event.clientY &&
                        event.clientY <= rect.top + rect.height &&
                        rect.left <= event.clientX &&
                        event.clientX <= rect.left + rect.width;
                    if (!isInDialog) {
                        formHandler.closeDialog(dialog);
                    }
                });
                btn.addEventListener('click', () => {
                    formHandler.openDialog(dialog);
                });
                const closeModalBtn = dialog.querySelector(
                    '.form__button--cancel'
                );
                if (closeModalBtn)
                    closeModalBtn.addEventListener('click', () => {
                        formHandler.closeDialog(dialog);
                    });
            }
            const forms = document.querySelectorAll('.form');
            for (const form of forms) formHandler.setupDisplay(form);
        }
        const interestUpdateForm = document.querySelector('#interestsDialog');
        if (interestUpdateForm) {
            const userInterestBlock = document.querySelector(
                '#interests .profile__item-container'
            );
            let userInterestsCheckboxes = [];
            if (userInterestBlock)
                userInterestsCheckboxes = userInterestBlock.querySelectorAll(
                    '.form__button--checkbox .button__span'
                );
            const userInterests = Array.from(
                userInterestsCheckboxes,
                (interest) => {
                    return interest.innerText;
                }
            );
            const globalInterests = interestUpdateForm.querySelectorAll(
                '.form__button--checkbox .button__span'
            );
            for (const interest of globalInterests) {
                if (userInterests.includes(interest.innerText)) {
                    const btn = interest.closest('.form__button--checkbox');
                    btn.click();
                }
            }
        }
        const textArea = document.querySelector('.form__textarea');
        if (textArea) {
            const description = document.querySelector(
                '#biography .profile__text'
            );
            if (description) {
                textArea.value = description.innerText;
            }
        }
        const profilePictureContainer = document.querySelector(
            '.profile__picture-block'
        );
        if (profilePictureContainer) {
            formHandler.setupFileUploads(profilePictureContainer);
        }
    }
}

export default ProfileHandler;
