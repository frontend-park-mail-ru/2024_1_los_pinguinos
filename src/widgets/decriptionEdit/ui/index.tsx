import { Modal } from "../../../shared/ui";
import { useState } from "../../../reactor";

const DescriptionEdit = () => {
    const [active, setActive] = useState(false);
    const [description, setDescription] = useState('Описание');

    const handleSave = () => {
        setActive(false);
    }

    return (
        <div className="descriptionEdit">
            <img src="https://via.placeholder.com/15" alt="avatar" />
            <div className="descriptionEdit__info">
                <p>Ваше описание</p>
                <h3>{description}</h3>
            </div>
            <button onClick={() => setActive(true)}>Изменить описание</button>
            <Modal active={active} setActive={setActive}>
                <div className="descriptionEdit__content">
                    <h2>Изменить описание</h2>
                    <input 
                    onChange={(e) => setDescription(e.target.value)}
                    type="text" placeholder="Введите новое описание" />
                    <button
                    onClick={handleSave}
                    >Сохранить</button>
                </div>
            </Modal>
        </div>
    )
};

export default DescriptionEdit;