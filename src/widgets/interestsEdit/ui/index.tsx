import { Modal, Button } from '../../../shared/ui/index';
import { useState } from '../../../reactor';
import InterestsInput from '../../interestsInput/ui';

const InterestsEdit = () => {
    const [active, setActive] = useState(false);
    const [interests, setInterests] = useState([
        'Интерес 1',
        'Интерес 2',
        'Интерес 3',
    ]);
    const [selectedInterests, setSelectedInterests] = useState(['Интерес 1']);

    const handleSave = () => {
        setActive(false);
    };

    return (
        <div className="profile__content-block">
            <div class="profile__label--row">
                <span class="profile__label--text">Ваши интересы</span>
                <Button
                    icon="icon-pencil-square"
                    fontSize="l1"
                    severity="edit"
                    onClick={() => setActive(true)}
                />
            </div>
            <div className="profile__item-container">
                {selectedInterests.map((interest, index) => (
                    <span className="interest" key={index}>
                        {interest}
                    </span>
                ))}
            </div>
            <Modal active={active} setActive={setActive}>
                <div className="dialog">
                    <span className="dialog__title">Изменить интересы</span>
                    <div className="dialog__list-wrap">
                        <InterestsInput
                            interests={interests}
                            selectedInterests={selectedInterests}
                            setSelectedInterests={setSelectedInterests}
                        />
                    </div>
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

export default InterestsEdit;
