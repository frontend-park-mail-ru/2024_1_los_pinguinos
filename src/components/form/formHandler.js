class FormHandler {
    constructor() {
        this.currentStep = 0;
    }

    isValidField(type, value) {}

    setupDisplay() {
        const continueButtons = document.getElementsByClassName('form__button--continue');
        for (let button of continueButtons) {
            button.addEventListener('click', () => {
                const currentFormStep = document.getElementById(this.currentStep);
                const nextFormStep = document.getElementById(this.currentStep + 1);
                if (nextFormStep) {
                    this.currentStep++;
                    currentFormStep.style.display = 'none';
                    nextFormStep.style.display = 'block';
                }
                if (this.currentStep === 0) {
                    localStorage.setItem('token', true);
                    window.location.href = '/main';
                }
            });
        }

        const navigationButtons = document.getElementsByClassName('form__button--nav');
        for (let button of navigationButtons) {
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

        document.getElementById(this.currentStep).style.display = 'block';
    }
}

export default FormHandler;
