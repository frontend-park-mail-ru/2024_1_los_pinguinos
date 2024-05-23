import { Modal, Button } from '../../../shared/ui/index';
import { useState, useEffect } from '../../../reactor';
import InterestsInput from '../../interestsInput/ui';
import { store } from '../../../app/app';
import { updateInterests } from '../../../entities/session/api/index';
import { clsx } from '../../../shared/lib/clsx';
import './index.css';

/**
 * A InterestsEdit component that renders a form for editing the user's interests.
 *
 * @function InterestsEdit
 * @returns {JSX.Element} The rendered interests edit component.
 */
const InterestsEdit = () => {
    const userInterests = Array.from(
        store.getState().interests ? store.getState().interests : [],
        (interest) => {
            return interest.name ? interest.name : interest;
        },
    );
    const [active, setActive] = useState(false);
    const emptyError = 'Выберите хотя-бы один интерес';
    const [currentInterests, setCurrentInterests] = useState(userInterests);
    const [selectedInterests, setSelectedInterests] = useState(userInterests);
    const [interestsEmpty, setInterestsEmpty] = useState(
        selectedInterests.length === 0 ? emptyError : '',
    );
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (selectedInterests.length === 0) {
            setInterestsEmpty(emptyError);
        } else {
            setInterestsEmpty('');
        }
    }, [selectedInterests]);

    /**
     * Handles the save action for updating the interests.
     *
     * @function handleSave
     */
    async function handleSave() {
        if (!interestsEmpty) {
            setFormError('');
            try {
                const response = await updateInterests(selectedInterests);
                setActive(false);
                setCurrentInterests(selectedInterests);
                store.dispatch({
                    type: 'UPDATE_SOMETHING',
                    payload: { interests: selectedInterests },
                });
            } catch {
                setFormError('Что-то пошло не так');
            }
        }
    }

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
                <form
                    className="dialog"
                    onSubmit={(event: any) => {
                        event.preventDefault();
                    }}
                >
                    <span className="dialog__title">Изменить интересы</span>
                    <div className="dialog__list-wrap">
                        {InterestsInput({
                            selectedInterests: selectedInterests,
                            setSelectedInterests: setSelectedInterests,
                        })}
                    </div>
                    <div className="dialog__button-wrap">
                        <Button
                            label="Отмена"
                            size="m"
                            fontSize="m"
                            severity="cancel"
                            onClick={() => {
                                setActive(false);
                                setCurrentInterests(userInterests);
                                setSelectedInterests(userInterests);
                                setFormError('');
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
                    <span
                        className={clsx(
                            !(formError || interestsEmpty) && 'any--none',
                            'dialog__error',
                        )}
                    >
                        {formError}
                        {interestsEmpty}
                    </span>
                </form>
            </Modal>
        </div>
    );
};

export default InterestsEdit;
