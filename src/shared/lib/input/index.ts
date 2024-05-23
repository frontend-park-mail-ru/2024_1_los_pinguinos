import { TInputType } from '../../ui'
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
