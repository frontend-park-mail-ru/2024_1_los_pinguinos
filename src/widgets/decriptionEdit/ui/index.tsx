import { Modal, Button, TextArea } from '../../../shared/ui';
import { useState } from '../../../reactor';
import { updateDescription } from '../../../entities/session/api';

const DescriptionEdit = () => {
    const [active, setActive] = useState(false);
    const [description, setDescription] = useState('Описание');
    const [dialogError, setDialogError] = useState('');
    async function handleSave() {
        try {
            const response = await updateDescription(description);
            setActive(false);
            setDialogError('');
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
                <div className="dialog">
                    <span className="dialog__title">Изменить описание</span>
                    <TextArea
                        label="Ваше био"
                        maxlength={320}
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value);
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
                    <span className="form__error">{dialogError}</span>
                </div>
            </Modal>
        </div>
    );
};

export default DescriptionEdit;
