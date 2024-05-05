import { useState, useEffect } from '../../../reactor/index';
import { Button, Input, InputCheckbox } from '../../../shared/ui';
import {
    validateInput,
    IStep,
    updateInputError,
} from '../../../shared/lib/index';
import { clsx } from '../../../clsx';
interface TDataStep extends IStep {
    setName: (event: any) => void;
    setDate: (event: any) => void;
    setGender: (event: any) => void;
    name: string;
    date: string;
    gender: string;
}

const StepData = ({
    onNavigateBack,
    onNavigateForward,
    name,
    setName,
    date,
    setDate,
    gender,
    setGender,
    display,
}: TDataStep) => {
    const [currentName, setCurrentName] = useState('');
    const [touchedName, setTouchedName] = useState(false);
    const [validatedName, setValidatedName] = useState(false);
    const [nameError, setNameError] = useState('');

    const [currentDate, setCurrentDate] = useState('');
    const [touchedDate, setTouchedDate] = useState(false);
    const [validatedDate, setValidatedDate] = useState(false);
    const [dateError, setDateError] = useState('');

    const [stepError, setStepError] = useState('');
    useEffect(() => {
        updateInputError({
            inputType: 'text',
            inputValue: currentName,
            isTouched: touchedName,
            setTouched: setTouchedName,
            isValidated: validatedName,
            errorMessageEmpty: 'Поле не может быть пустым',
            errorMessageInvalid: 'invalid name',
            setErrorMessage: setNameError,
            helpMessage: 'help name',
            setHelpMessage: setStepError,
        });
        return () => {};
    }, [currentName, validatedName]);
    useEffect(() => {
        updateInputError({
            inputType: 'date',
            inputValue: currentDate,
            isTouched: touchedDate,
            setTouched: setTouchedDate,
            isValidated: validatedDate,
            errorMessageEmpty: 'Поле не может быть пустым',
            errorMessageInvalid: 'invalid date',
            setErrorMessage: setDateError,
            helpMessage: 'help date',
            setHelpMessage: setStepError,
        });
        return () => {};
    }, [currentDate, validatedDate]);
    useEffect(() => {
        if (gender)
            setStepError((currentError: string) =>
                currentError.replace('gender err' + '\n', ''),
            );
    }, [gender]);
    const allowContinue = () => {
        const nameValid = validateInput('text', name);
        const dateValid = validateInput('date', date);
        if (nameValid && dateValid && gender) {
            if (onNavigateForward) onNavigateForward();
            return;
        }
        if (!gender) {
            setStepError((currentError: string) => {
                if (!currentError.includes('gender err'))
                    currentError += 'gender err' + '\n';
                return currentError;
            });
        }
        setValidatedName(true);
        setValidatedDate(true);
    };
    return (
        <div className={clsx('form__step', !display && 'any--none')}>
            <div className="form__header">
                <Button
                    icon="icon-chevron-left"
                    fontSize="xl"
                    severity="link"
                    onClick={onNavigateBack}
                />
            </div>
            <span className="form__title">Давайте знакомиться</span>
            <span className="form__description">
                Заполните оставшиеся данные, чтобы другие люди могли узнать вас
                лучше
            </span>
            <div className="form__input-container">
                <Input
                    type="text"
                    autocomplete="name"
                    label="Ваше имя"
                    maxlength={32}
                    autofocus
                    onInput={(event: any) => {
                        setCurrentName(event.target.value);
                    }}
                    onChange={(event: any) => {
                        setName(event.target.value);
                    }}
                    value={name}
                    error={nameError}
                />
                <div className="form__side-block">
                    <Input
                        type="date"
                        autocomplete="bday"
                        label="Дата рождения"
                        min="1950-01-01"
                        max="2100-01-01"
                        onInput={(event: any) => {
                            setCurrentDate(event.target.value);
                        }}
                        onChange={(event: any) => {
                            setDate(event.target.value);
                        }}
                        value={date}
                        error={dateError}
                    />
                    <div class="form__checkbox-container">
                        <span class="input__label">Ваш пол</span>
                        <div class="form__input--row">
                            <InputCheckbox
                                label="М"
                                round
                                checked={gender === 'male'}
                                onChange={(event: any) => {
                                    setGender(
                                        event.target.checked ? 'male' : '',
                                    );
                                }}
                            />
                            <InputCheckbox
                                label="Ж"
                                round
                                checked={gender === 'female'}
                                onChange={(event: any) => {
                                    setGender(
                                        event.target.checked ? 'female' : '',
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    label="Продолжить"
                    severity="success"
                    size="max-width"
                    fontSize="l"
                    onClick={allowContinue}
                />
            </div>
            <span className="form__error">{stepError}</span>
        </div>
    );
};
export default StepData;
