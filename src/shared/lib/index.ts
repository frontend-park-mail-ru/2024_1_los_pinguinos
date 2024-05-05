export function getAuthorizationToken() {
    const csrfToken = localStorage.getItem('csrfToken');
    return csrfToken;
}

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
        text: /^(?=.{2,32}$)[\p{L}]+$/u,
        emoji: /^[\x20-\x7E]+$/,
    };
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

export const togglePassword = (event: any) => {
    event.target.classList.toggle('eye--inv');
    event.target.classList.toggle('eye--vis');
    const input = event.target.closest('div').querySelector('input');
    input.type = input.type === 'text' ? 'password' : 'text';
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
            console.log('error present');
            setError((currentError: string) => {
                if (!currentError.includes(errorMessage))
                    currentError += errorMessage + '\n';
                return currentError;
            });
        }
    }
};
