import landing from './landing.hbs';
import competeImg from '../../assets/compete.svg';
import runImg from '../../assets/run.svg';
import workoutImg from '../../assets/workout.svg';
import logoImg from '../../assets/logo.svg';

function checkVisible(elm: HTMLElement) {
    const rect = elm.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

class Landing {
    async render() {
        const defaultAvatar = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
        const renderContext = {
            points: [
                {
                    pointImage: encodeURIComponent(workoutImg),
                    pointText: 'Некому подстраховать',
                },
                {
                    pointImage: encodeURIComponent(runImg),
                    pointText: 'Скучно бегать в одиночку',
                },
                {
                    pointImage: encodeURIComponent(competeImg),
                    pointText: 'Хочу соревноваться',
                },
            ],
            reviews: [
                {
                    reviewTitle: 'Иван Иванов',
                    reviewContent: 'Бегать в одиночку скучно, а вместе весело. Спасибо за приложение, теперь я нашел компанию для бега.',
                    reviewAvatar: defaultAvatar,
                },
                {
                    reviewTitle: 'Петр Петров',
                    reviewContent: 'Спасибо за приложение, теперь я нашел компанию для бега.',
                    reviewAvatar: defaultAvatar,
                },
                {
                    reviewTitle: 'Сидор Сидоров',
                    reviewContent: 'Всегда хотел соревноваться, но не было с кем. Спасибо за приложение, теперь я нашел компанию для соревнований.',
                    reviewAvatar: defaultAvatar,
                },
                {
                    reviewTitle: 'Федор Федоров',
                    reviewContent: 'Нашел компанию для бега, теперь мне не скучно.',
                    reviewAvatar: defaultAvatar,
                },
            ],
            logo: encodeURIComponent(logoImg),
        };

        return landing(renderContext);
   }
   async controller() {
        const wrapper = document.querySelector('.landing-wrapper') as HTMLElement; // Cast element to HTMLElement
        const element = document.querySelector('.point') as HTMLElement; // Cast element to HTMLElement
        const image = document.querySelector('.landing__picture') as HTMLImageElement; // Cast element to HTMLImageElement
        if (image) {
            image.onload = () => {
                if (!checkVisible(element)) {
                    const scrollNotifier = document.createElement('div');
                    scrollNotifier.classList.add('scroll__notifier');
                    wrapper.addEventListener('scroll', () => {
                        scrollNotifier.classList.toggle('any--hidden');
                        setTimeout(() => {scrollNotifier.remove();}, 200);
                    }, {once: true});
                    wrapper.appendChild(scrollNotifier);
                }
            };
        }
   }
}

export default Landing;
