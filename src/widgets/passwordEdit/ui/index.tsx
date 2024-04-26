import { Modal } from "../../../shared/ui";
import { useState } from "../../../reactor";

const PasswordEdit = () => {
    const [active, setActive] = useState(false);
    const [password, setPassword] = useState('Пароль');

    const handleSave = () => {
        setActive(false);
    }

    return (
        <div className="passwordEdit">
            <img src="https://via.placeholder.com/15" alt="avatar" />
            <div className="passwordEdit__info">
                <p>Ваш пароль</p>
                <h3>{password}</h3>
            </div>
            <button onClick={() => setActive(true)}>Изменить пароль</button>
            <Modal active={active} setActive={setActive}>
                <div className="passwordEdit__content">
                    <h2>Изменить пароль</h2>
                    <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type="text" placeholder="Введите новый пароль" />
                    <button
                    onClick={handleSave}
                    >Сохранить</button>
                </div>
            </Modal>
        </div>
    )
};

export default PasswordEdit;