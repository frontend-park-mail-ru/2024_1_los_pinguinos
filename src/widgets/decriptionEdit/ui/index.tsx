import { Modal, Button } from '../../../shared/ui';
import { useState } from '../../../reactor';

const DescriptionEdit = () => {
    const [active, setActive] = useState(false);
    const [description, setDescription] = useState('Описание');

    const handleSave = () => {
        setActive(false);
    };

    return (
        <div className="profile__content-block">
            <div class="profile__label--row">
                <span class="profile__label--text">Ваше био</span>
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
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите новое описание"
                    ></textarea>
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
                </div>
            </Modal>
        </div>
    );
};

export default DescriptionEdit;
