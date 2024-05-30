import { validateInput } from '../input/index';
import background404 from '../../../assets/background/background404.svg';
import backgroundMain from '../../../assets/background/backgroundMain.svg';
import backgroundLanding from '../../../assets/background/backgroundLanding.svg';
import backgroundAuth from '../../../assets/background/backgroundAuth.svg';
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
            return backgroundLanding;
        case '/login':
            return backgroundAuth;
        case '/register':
            return backgroundAuth;
        case '/profile':
            return backgroundMain;
        case '/main':
            return backgroundMain;
        case '/matches':
            return backgroundMain;
        case '/chats':
            return backgroundMain;
        default:
            return background404;
    }
};

export const updateBackground = (path: string) => {
    const body = document.body;
    const background = `data:image/svg+xml,${encodeURIComponent(
        getBackground(path),
    )}`;
    body.style.backgroundImage = `url("${background}")`;
};

let id = 0;
export const genId = () => {
    return id++;
};
