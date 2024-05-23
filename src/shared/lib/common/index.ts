import { validateInput } from  '../input/index';
/**
 * Обновляет ошибку валидации формы
 * @param {any} - объект с параметрами валидации
 * @returns {void}
 */
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
