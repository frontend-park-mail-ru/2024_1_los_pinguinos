import { Modal, Button, Input } from '../../../shared/ui';
import { useState } from '../../../reactor';

const PasswordEdit = () => {
    const [active, setActive] = useState(false);

    const handleSave = () => {
        setActive(false);
    };

    return (
        <div className="profile__settings--row">
            <span
                className="icon-eye-slash"
                style="color: var(--color__light--primary); font-size: large; font-weight: 600;"
            ></span>
            <div className="profile__settings--column">
                <span className="profile__text">Ваш пароль</span>
                <span className="profile__text">********</span>
            </div>
            <Button
                icon="icon-pencil-square"
                fontSize="l1"
                severity="edit"
                onClick={() => setActive(true)}
            />
            <Modal active={active} setActive={setActive}>
                <div className="dialog">
                    <span className="dialog__title">Изменить пароль</span>
                    {Input({
                        type: 'password',
                        placeholder: 'Введите новый пароль',
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
                </div>
            </Modal>
        </div>
    );
};

export default PasswordEdit;
