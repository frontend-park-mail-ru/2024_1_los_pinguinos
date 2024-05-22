import { Modal, Button, Input } from '../../../shared/ui/index';
import { useState, useEffect } from '../../../reactor/index';
import { updateFormError, validateInput } from '../../../shared/lib/index';
import { updateName } from '../../../entities/session/api/index';
import { store } from '../../../app/app';
import { clsx } from '../../../clsx/index';

/**
 * A NameEdit component that renders a form for editing the user's name.
 *
 * @function NameEdit
 * @returns {JSX.Element} The rendered name edit component.
 */
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

    /**
     * Handles the save action for updating the name.
     *
     * @function handleSave
     */
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
                className="icon-at"
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
                <form
                    className="dialog"
                    onSubmit={(event: any) => {
                        event.preventDefault();
                    }}
                >
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
                        maxlength: 32,
                        minlength: 2,
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
                    <span
                        className={clsx(
                            !dialogError && 'any--none',
                            'dialog__error',
                        )}
                    >
                        {dialogError}
                    </span>
                </form>
            </Modal>
        </div>
    );
};

export default NameEdit;
