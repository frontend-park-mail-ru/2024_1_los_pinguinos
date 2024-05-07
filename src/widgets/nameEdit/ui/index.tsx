import { Modal, Button, Input } from '../../../shared/ui';
import { useState, useEffect } from '../../../reactor';
import { updateFormError, validateInput } from '../../../shared/lib';
import { updateName } from '../../../entities/session/api';
import { store } from '../../../app/app';

const NameEdit = () => {
    const userName = store.getState().name;
    const [active, setActive] = useState(false);
    const [currentName, setCurrentName] = useState(userName);
    const [nameError, setNameError] = useState('');
    const [name, setName] = useState(currentName);
    const [dialogError, setDialogError] = useState('');
    const [displayName, setDisplayName] = useState(currentName);

    useEffect(() => {
        updateFormError({
            type: 'text',
            value: currentName,
            error: nameError,
            setError: setDialogError,
            errorMessage: 'Введите полные Имя (Фамилию)',
        });
        return () => {};
    }, [nameError]);

    async function handleSave() {
        if (!nameError) {
            try {
                const response = await updateName(currentName);
                store.dispatch({
                    type: 'UPDATE_SOMETHING',
                    payload: { name: currentName },
                });
                setDisplayName(currentName);
                setDialogError('');
                setActive(false);
            } catch {
                setDialogError('Что-то пошло не так');
            }
        }
    }

    return (
        <div className="profile__settings--row">
            <span
                className="icon-person"
                style="color: var(--color__light--primary); font-size: large; font-weight: 600;"
            ></span>
            <div className="profile__settings--column">
                <span className="profile__text">Ваше имя</span>
                <span className="profile__text">{displayName}</span>
            </div>
            <Button
                icon="icon-pencil-square"
                fontSize="l1"
                severity="edit"
                onClick={() => setActive(true)}
            />
            <Modal active={active} setActive={setActive}>
                <div className="dialog">
                    <span className="dialog__title">Изменить имя</span>
                    <span className="dialog__info">Введите новое имя</span>
                    {Input({
                        label: 'Ваше имя',
                        type: 'text',
                        value: name,
                        placeholder: name,
                        onInput: (event) => {
                            setCurrentName(event.target.value);
                        },
                        onChange: (event) => {
                            if (validateInput('text', event.target.value))
                                setName(event.target.value);
                        },
                        autocomplete: 'off',
                        error: nameError,
                        setError: setNameError,
                        validate: true,
                    })}
                    <div className="dialog__button-wrap">
                        <Button
                            label="Отмена"
                            size="m"
                            fontSize="m"
                            severity="cancel"
                            onClick={() => {
                                setActive(false);
                            }}
                        />
                        <Button
                            label="Сохранить"
                            size="m"
                            fontSize="m"
                            severity="success"
                            onClick={handleSave}
                        />
                    </div>
                    <span className="form__error">{dialogError}</span>
                </div>
            </Modal>
        </div>
    );
};

export default NameEdit;
