import { TInputType } from '../../ui';
/**
 * Валидирует ввод пользователя
 * @param {string} type - тип валидации
 * @param {string} input - ввод пользователя
 * @returns {boolean} - результат валидации
 */
export const validateInput = (type: string, input: string): boolean => {
    const expressions = {
        password: /^.{8,32}$/,
        email: /^(?=.{1,320}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        text: /^[\p{L}]+(?:[-'\s][\p{L}]+)*$/u,
        emoji: /^[\x20-\x7E]+$/,
        textArea: /^[\p{L}\p{N}\p{P}\p{S}\p{Z}]+$/u,
    } as any;
    const regexExpression = expressions[type];
    const regexEmoji = expressions['emoji'];
    if (type === 'text' || type === 'textArea') {
        return regexExpression.test(input);
    }
    if (type === 'date') {
        const minYear = 1930;
        const maxYear = new Date().getFullYear() - 16;
        const inputYear = new Date(input).getFullYear();
        console.log(inputYear >= minYear && inputYear <= maxYear);
        return inputYear >= minYear && inputYear <= maxYear;
    }

    return regexExpression.test(input) && regexEmoji.test(input);
};

export interface IStep {
    display: boolean;
    onNavigateBack?: (event: any) => void;
    onNavigateForward?: Function;
}

/**
 * Обновляет ошибку валидации ввода
 * @param {IInputError} - объект с параметрами валидации
 * @returns {void}
 */
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
/**
 * Обновляет ошибку валидации формы
 * @param {any} - объект с параметрами валидации
 * @returns {void}
 */
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
