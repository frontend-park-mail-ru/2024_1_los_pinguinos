import { Modal } from "../../../shared/ui";
import { useState } from "../../../reactor";
import InterestsInput from '../../interestsInput/ui';

const InterestsEdit = (
    
) => {
    const [active, setActive] = useState(false);
    const [interests, setInterests] = useState(['Интерес 1', 'Интерес 2', 'Интерес 3']);
    const [selectedInterests, setSelectedInterests] = useState(['Интерес 1']);

    const handleSave = () => {
        setActive(false);
    }

    return (
        <div className="interestsEdit">
            <div className="interestsEdit__info">
                <p>Ваши интересы</p>
                <div>
                    {selectedInterests.map((interest, index) => (
                        <span key={index}>{interest}</span>
                    ))}
                </div>
            </div>
            <button onClick={() => setActive(true)}>Изменить интересы</button>
            <Modal active={active} setActive={setActive}>
                <div className="interestsEdit__content">
                    <h2>Изменить интересы</h2>
                    <InterestsInput interests={interests} selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests} />
                    <button
                    onClick={handleSave}
                    >Сохранить</button>
                </div>
            </Modal>
        </div>
    )
};

export default InterestsEdit;