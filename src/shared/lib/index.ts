/**
 * Возвращает возраст по дате рождения
 * @param {string} dateString - дата рождения в формате 'YYYY-MM-DD'
 * @returns {number} - возраст
 */
export const getAge = (dateString: string): number => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

/**
 * Возвращает время, прошедшее с момента отправки сообщения
 * @param {number} timestamp - метка времени
 * @returns {string} - время, прошедшее с момента отправки сообщения
 */
export function timeAgo(timestamp: number) {
    if (timestamp < 0) return '';
    const now = Math.floor(Date.now() / 1000); // текущая метка времени в секундах
    const secondsAgo = Math.floor((now - timestamp / 1000) / 60); // разница в минутах
    if (secondsAgo < 1) {
        return 'только что';
    }
    if (secondsAgo < 60) {
        return `${secondsAgo} минут назад`;
    } else if (secondsAgo < 1440) {
        // если меньше одного дня
        const hoursAgo = Math.floor(secondsAgo / 60);

        return `${hoursAgo} часов назад`;
    } else {
        // если больше одного дня
        const daysAgo = Math.floor(secondsAgo / 1440);

        return `${daysAgo} дней назад`;
    }
}

/**
 * Validates input according to predefined regex parameters.
 * @function
 * @param {string} type - input type
 * @param {string} input - the input itself
 * @returns {boolean} - regex validation result
 */
export const validateInput = (type: string, input: string): boolean => {
    const expressions = {
        password: /^.{8,32}$/,
        email: /^(?=.{1,320}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        text: /^[\p{L}]+(?:[-'\s][\p{L}]+)*$/u,
        emoji: /^[\x20-\x7E]+$/,
    } as any;
    const regexExpression = expressions[type];
    const regexEmoji = expressions['emoji'];
    if (type === 'text') {
        return regexExpression.test(input);
    }
    if (type === 'date') {
        const timeStamp = Date.parse(input) / 1000;

        return 0 <= timeStamp && timeStamp < 1230757200;
    }

    return regexExpression.test(input) && regexEmoji.test(input);
};

export interface IStep {
    display: boolean;
    onNavigateBack?: (event: any) => void;
    onNavigateForward?: Function;
}
import { TInputType } from '../ui/index';
export interface IInputError {
    inputType: TInputType;
    inputValue: string;
    isTouched: boolean;
    setTouched: (event: any) => void;
    isValidated?: boolean;
    errorMessageEmpty: string;
    errorMessageInvalid?: string;
    setErrorMessage: (event: any) => void;
    helpMessage?: string;
    setHelpMessage?: (event: any) => void;
}
export const updateInputError = ({
    inputType,
    inputValue,
    isTouched,
    setTouched,
    isValidated,
    errorMessageEmpty,
    errorMessageInvalid,
    setErrorMessage,
    helpMessage,
    setHelpMessage,
}: IInputError) => {
    if (!inputValue && isTouched) {
        setErrorMessage(errorMessageEmpty);
    } else {
        if (!validateInput(inputType, inputValue) && isTouched && isValidated) {
            setErrorMessage(errorMessageInvalid);
            if (setHelpMessage)
                setHelpMessage((currentError: string) => {
                    if (!currentError.includes(helpMessage))
                        currentError += helpMessage + '\n';
                    return currentError;
                });
        } else {
            setErrorMessage('');
            if (setHelpMessage)
                setHelpMessage((currentError: string) =>
                    currentError.replace(helpMessage + '\n', ''),
                );
        }
    }
    if (!isTouched) {
        setTouched(true);
    }
};

export const updateFormError = ({
    type,
    value,
    error,
    setError,
    errorMessage,
}: any) => {
    const isValid = validateInput(type, value);
    if (isValid) {
        setError((currentError: string) =>
            currentError.replace(errorMessage + '\n', ''),
        );
    } else {
        if (error) {
            setError((currentError: string) => {
                if (!currentError.includes(errorMessage))
                    currentError += errorMessage + '\n';
                return currentError;
            });
        }
    }
};

const getBackground = (path: string) => {
    switch (path) {
        case '/':
            return 'var(--background--landing)';
        case '/login':
            return 'var(--background--login)';
        case '/register':
            return 'var(--background--register)';
        case '/profile':
            return 'var(--background--profile)';
        case '/main':
            return 'var(--background--main)';
        case '/matches':
            return 'var(--background--matches)';
        case '/chats':
            return 'var(--background--chats)';
        case '/rhack':
            return 'var(--background--profile)';
        default:
            return 'var(--background--404)';
    }
};

export const updateBackground = (path: string) => {
    const body = document.body;
    body.style.backgroundImage = getBackground(path);
};

let id = 0;
export const genId = () => {
    return id++;
};
