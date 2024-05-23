import competeImg from '../../assets/compete.svg';
import runImg from '../../assets/run.svg';
import workoutImg from '../../assets/workout.svg';
import logoImg from '../../assets/logo.svg';

export const defaultAvatar = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';

export const points = [
    {
        icon: `data:image/svg+xml,${encodeURIComponent(workoutImg)}`,
        text: 'Некому подстраховать',
    },
    {
        icon: `data:image/svg+xml,${encodeURIComponent(runImg)}`,
        text: 'Скучно бегать в одиночку',
    },
    {
        icon: `data:image/svg+xml,${encodeURIComponent(competeImg)}`,
        text: 'Хочу соревноваться',
    },
];

export const reviews = [
    {
        title: 'Иван Иванов',
        content:
            'Бегать в одиночку скучно, а вместе весело. Спасибо за приложение, теперь я нашел компанию для бега.',
        avatar: defaultAvatar,
    },
    {
        title: 'Петр Петров',
        content: 'Спасибо за приложение, теперь я нашел компанию для бега.',
        avatar: defaultAvatar,
    },
    {
        title: 'Сидор Сидоров',
        content:
            'Всегда хотел соревноваться, но не было с кем. Спасибо за приложение, теперь я нашел компанию для соревнований.',
        avatar: defaultAvatar,
    },
    {
        title: 'Федор Федоров',
        content: 'Нашел компанию для бега, теперь мне не скучно.',
        avatar: defaultAvatar,
    },
];

export const logo = `data:image/svg+xml,${encodeURIComponent(logoImg)}`;
