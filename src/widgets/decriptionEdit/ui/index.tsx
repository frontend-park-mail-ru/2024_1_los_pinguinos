import { Modal, Button, TextArea } from '../../../shared/ui';
import { useEffect, useState } from '../../../reactor';
import { updateDescription } from '../../../entities/session/api';
import { store } from '../../../app/app';
import { clsx } from '../../../clsx';

const DescriptionEdit = () => {
    const userDescription = store.getState().description;
    const [active, setActive] = useState(false);
    const [currentDescription, setCurrentDescription] =
        useState(userDescription);
    const [description, setDescription] = useState(currentDescription);
    const [dialogError, setDialogError] = useState('');
    useEffect(() => {
        setCurrentDescription(currentDescription);
    }, [currentDescription]);
    async function handleSave() {
        try {
            const response = await updateDescription(currentDescription);
            setDescription(currentDescription);
            store.dispatch({
                type: 'UPDATE_SOMETHING',
                payload: { description: currentDescription },
            });
            setDialogError('');
            setActive(false);
        } catch {
            setDialogError('Что-то пошло не так');
        }
    }

    return (
        <div className="profile__content-block">
            <div class="profile__label--row">
                <span class="profile__label-text">Ваше био</span>
                <Button
                    icon="icon-pencil-square"
                    fontSize="l1"
                    severity="edit"
                    onClick={() => setActive(true)}
                />
            </div>
            <p className="profile__text">{description}</p>
            <Modal active={active} setActive={setActive}>
                <form
                    className="dialog"
                    onSubmit={(event: any) => {
                        event.preventDefault();
                    }}
                >
                    <span className="dialog__title">Изменить описание</span>
                    <TextArea
                        label="Ваше био"
                        maxlength={320}
                        value={description}
                        onChange={(event) => {
                            setCurrentDescription(event.target.value);
                        }}
                        onInput={(event) => {
                            setCurrentDescription(event.target.value);
                        }}
                    />
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

export default DescriptionEdit;
