import {Modal} from "../../../shared/ui"
import { useState } from "../../../reactor";

const NameEdit = () => {
    const [active, setActive] = useState(false);
    const [name, setName] = useState('Имя');

    const handleSave = () => {
        setActive(false);
    } 

    return (
        <div className="nameEdit">
            <img src="https://via.placeholder.com/15" alt="avatar" />
            <div className="nameEdit__info">
                <p>Ваше имя</p>
                <h3>{name}</h3>
            </div>
            <button onClick={() => setActive(true)}>Изменить имя</button>
            <Modal active={active} setActive={setActive}>
                <div className="nameEdit__content">
                    <h2>Изменить имя</h2>
                    <input 
                    onChange={(e) => setName(e.target.value)}
                    type="text" placeholder="Введите новое имя" />
                    <button
                    onClick={handleSave}
                    >Сохранить</button>
                </div>
            </Modal>
        </div>
    )
};

export default NameEdit;