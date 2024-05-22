import { useState, useEffect } from '../../../reactor/index';
import { Button, Input, InputCheckbox } from '../../../shared/ui';
import {
    validateInput,
    IStep,
    updateFormError,
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

/**
 * A StepData component that renders the step for entering user data.
 *
 * @function StepData
 * @param {TDataStep} props - The properties of the step data component.
 * @returns {JSX.Element} The rendered step data component.
 */
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
    const [nameError, setNameError] = useState('');

    const [currentDate, setCurrentDate] = useState('');
    const [dateError, setDateError] = useState('');

    const [stepError, setStepError] = useState('');
    useEffect(() => {
        updateFormError({
            type: 'text',
            value: currentName,
            error: nameError,
            setError: setStepError,
            errorMessage: 'Введите полные Имя (Фамилию).',
        });
        return () => {};
    }, [nameError]);
    useEffect(() => {
        updateFormError({
            type: 'date',
            value: currentDate,
            error: dateError,
            setError: setStepError,
            errorMessage: 'Введите дату рождения (с 1970 по 2009)',
        });
        return () => {};
    }, [dateError]);
    useEffect(() => {
        if (gender)
            setStepError((currentError: string) =>
                currentError.replace('Выберите пол' + '\n', ''),
            );
    }, [gender]);
    const allowContinue = () => {
        const nameValid = validateInput('text', name);
        const dateValid = validateInput('date', date);
        if (!name && !nameError) setNameError('Поле не может быть пустым');
        if (!date && !dateError) setDateError('Поле не может быть пустым');
        if (nameValid && dateValid && gender) {
            if (onNavigateForward) onNavigateForward();
            return;
        }
        if (!gender) {
            setStepError((currentError: string) => {
                if (!currentError.includes('Выберите пол'))
                    currentError += 'Выберите пол' + '\n';
                return currentError;
            });
        }
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
                <span className="form__description step__counter">1/3</span>
            </div>
            <span className="form__title">Давайте знакомиться</span>
            <span className="form__description">
                Заполните оставшиеся данные, чтобы другие люди могли узнать вас
                лучше
            </span>
            <div className="form__input-container">
                {Input({
                    type: 'text',
                    autocomplete: 'name',
                    label: 'Ваше имя',
                    placeholder: 'Ваше имя',
                    maxlength: 32,
                    autofocus: true,
                    onInput: (event: any) => {
                        setCurrentName(event.target.value);
                    },
                    onChange: (event: any) => {
                        setName(event.target.value);
                    },
                    value: name,
                    error: nameError,
                    setError: setNameError,
                    validate: true,
                })}
                <div className="form__side-block">
                    {Input({
                        type: 'date',
                        autocomplete: 'bday',
                        label: 'Дата рождения',
                        min: '1970-01-01',
                        max: '2100-01-01',
                        onInput: (event: any) => {
                            setCurrentDate(event.target.value);
                        },
                        onChange: (event: any) => {
                            setDate(event.target.value);
                        },
                        value: date,
                        error: dateError,
                        setError: setDateError,
                        validate: true,
                    })}
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
            <span className={clsx(!stepError && 'any--none', 'form__error')}>
                {stepError}
            </span>
        </div>
    );
};
export default StepData;
