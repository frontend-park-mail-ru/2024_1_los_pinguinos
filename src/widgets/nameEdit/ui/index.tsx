import { Modal, Button, Input } from '../../../shared/ui';
import { useState } from '../../../reactor';

const NameEdit = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState('Имя');

    const handleSave = () => {
        setActive(false);
    };

    return (
        <div className="profile__settings--row">
            <span
                className="icon-person"
                style="color: var(--color__light--primary); font-size: large; font-weight: 600;"
            ></span>
            <div className="profile__settings--column">
                <span className="profile__text">Ваше имя</span>
                <span className="profile__text">{name}</span>
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
                    <Input type="text" placeholder="Введите новое имя" />
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

export default NameEdit;
