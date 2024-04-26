import { Modal } from "../../../shared/ui";
import { useState } from "../../../reactor";

const MailEdit = () => {
    const [active, setActive] = useState(false);
    const [mail, setMail] = useState('Почта');

    const handleSave = () => {
        setActive(false);
    }

    return (
        <div className="mailEdit">
            <img src="https://via.placeholder.com/15" alt="avatar" />
            <div className="mailEdit__info">
                <p>Ваша почта</p>
                <h3>{mail}</h3>
            </div>
            <button onClick={() => setActive(true)}>Изменить почту</button>
            <Modal active={active} setActive={setActive}>
                <div className="mailEdit__content">
                    <h2>Изменить почту</h2>
                    <input 
                    onChange={(e) => setMail(e.target.value)}
                    type="text" placeholder="Введите новую почту" />
                    <button
                    onClick={handleSave}
                    >Сохранить</button>
                </div>
            </Modal>
        </div>
    )
};

export default MailEdit;