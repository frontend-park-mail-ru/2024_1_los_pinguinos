import { Modal, Button } from '../../../shared/ui/index';
import { useState, useEffect } from '../../../reactor';
import InterestsInput from '../../interestsInput/ui';

const InterestsEdit = () => {
    const [active, setActive] = useState(false);
    const [interests, setInterests] = useState([
        'Интерес 1',
        'Интерес 2',
        'Интерес 3',
        'Интерес 4',
        'Интерес 5',
        'Интерес 6',
    ]);
    const emptyError = 'Выберите хотя-бы один интерес';
    const [currentInterests, setCurrentInterests] = useState(['Интерес 1']);
    const [selectedInterests, setSelectedInterests] =
        useState(currentInterests);
    const [interestsEmpty, setInterestsEmpty] = useState(
        selectedInterests.length === 0 ? emptyError : '',
    );
    useEffect(() => {
        if (selectedInterests.length === 0) {
            setInterestsEmpty(emptyError);
        } else {
            setInterestsEmpty('');
        }
    }, [selectedInterests]);

    const handleSave = () => {
        if (!interestsEmpty) {
            setActive(false);
            setCurrentInterests(selectedInterests);
        }
    };

    return (
        <div className="profile__content-block">
            <div class="profile__label--row">
                <span class="profile__label-text">Ваши интересы</span>
                <Button
                    icon="icon-pencil-square"
                    fontSize="l1"
                    severity="edit"
                    onClick={() => setActive(true)}
                />
            </div>
            <div className="profile__item-container">
                {currentInterests.map((interest, index) => (
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
                    <span className="form__error">{interestsEmpty}</span>
                </div>
            </Modal>
        </div>
    );
};

export default InterestsEdit;
