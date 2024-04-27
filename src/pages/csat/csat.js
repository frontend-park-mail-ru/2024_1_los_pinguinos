import csat from './csat.hbs';

const questions = ['Ленту', 'Приложение', 'Профиль'];

export const shouldShowNext = () => {
    const countLikes = localStorage.getItem('countLikes');
    const appAns = localStorage.getItem('appAns');
    const likeAns = localStorage.getItem('likeAns');
    const profileAns = localStorage.getItem('profileAns');
    const visitedProfile = localStorage.getItem('visitedProfile');

    if (+countLikes > 5 && !likeAns) {
        return questions[0];
    }
    if (!appAns) {
        return questions[1];
    }
    if (!profileAns && visitedProfile) {
        return questions[2];
    }

    return false;
};

class CSAT {
    async render() {
        return csat({ feature: shouldShowNext() });
    }

    async controller() {
        const buttons = document.querySelectorAll('.button--xxl');
        const closeButton = document.querySelector('.button--cross');
        closeButton.addEventListener('click', () => {
            window.parent.postMessage({ command: 'closeIframe' }, '*');
        });
        let rootHTML = document.querySelector('#root');
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('id');
                window.parent.postMessage(
                    { command: 'trackIframeResponse', response: id },
                    '*'
                );
                const current = shouldShowNext();
                if (current) {
                    if (current === 'Приложение') {
                        localStorage.setItem('appAns', 'Приложение');
                    }
                    if (current === 'Ленту') {
                        localStorage.setItem('likeAns', 'Лента');
                    }
                    if (current === 'Профиль') {
                        localStorage.setItem('profileAns', 'Профиль');
                    }
                }
                rootHTML.innerHTML = `<div class='csat'>Спасибо за ответ.</div>`;
                setTimeout(() => {
                    const next = shouldShowNext();
                    if (next) {
                        rootHTML.innerHTML = csat({
                            feature: next,
                        });
                        this.controller();
                    } else {
                        window.parent.postMessage({
                            command: 'closeIframe',
                        });
                    }
                }, 1000);
            });
        });
    }
}

export default CSAT;
