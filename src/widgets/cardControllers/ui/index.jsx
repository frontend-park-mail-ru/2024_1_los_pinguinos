import { complain } from '../../../features/complain/api';
import { like, dislike } from '../../../features/like/api';
import { Button } from '../../../shared/ui';
import { store } from '../../../app/app';
import { useState, useEffect } from '../../../reactor/index';
import ComplaintPopup from '../../complaintPopup/ui/complaintPopup';

const CardControllers = () => {
    // const [discard, setDiscard] = useState(false);
    // const currentCard = store.getState().currentCard;
    const [active, setActive] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const getCurrent = () => {
        const cards = document.querySelectorAll('.card');
        if (cards.length === 0) {
            setDisabled(true);

            return null;
        }
        const currentCard = cards[cards.length - 1].id.split('-')[1];
        setDisabled(false);

        return +currentCard;
    };
    useEffect(() => {
        setTimeout(() => getCurrent(), 1500);
    }, []);

    const handleLike = async () => {
        const currentCard = getCurrent();
        if (!currentCard) return;
        try {
            await like(currentCard);
        } catch {
            return;
        }
        store.dispatch({ type: 'UPDATE_CURRENT_CARD', payload: currentCard });
        const cards = document.querySelectorAll('.card');
        const currentcard = cards[cards.length - 1];
        currentcard.style.transition = 'transform 0.5s ease-in-out';
        currentcard.remove();
    };

    const [popupError, setPopupError] = useState('');
    const handleComplaint = async (complaintId = 1) => {
        setPopupError('');
        const currentCard = getCurrent();
        if (!currentCard) return;
        try {
            await complain({ id: complaintId, reciever: currentCard });
            setActive(false);
        } catch {
            setPopupError('Что-то пошло не так');

            return;
        }
        store.dispatch({ type: 'UPDATE_CURRENT_CARD', payload: currentCard });
        const cards = document.querySelectorAll('.card');
        const currentcard = cards[cards.length - 1];
        currentcard.style.transition = 'transform 0.5s ease-in-out';
        currentcard.remove();
    };

    const handleDislike = async () => {
        const currentCard = getCurrent();
        if (!currentCard) return;
        try {
            await dislike(currentCard);
        } catch {
            return;
        }
        store.dispatch({ type: 'UPDATE_CURRENT_CARD', payload: currentCard });
        const cards = document.querySelectorAll('.card');
        const currentcard = cards[cards.length - 1];
        currentcard.style.transition = 'transform 0.5s ease-in-out';
        currentcard.remove();
    };

    return (
        <div className="card-controllers">
            <Button
                severity="danger"
                icon="icon-x"
                fontSize="xxl"
                onClick={() => {
                    handleDislike();
                }}
                round
                fontColor="light-primary"
                disabled={disabled}
            />
            <Button
                severity="contrast"
                icon="icon-ban"
                fontSize="xl"
                onClick={() => {
                    const condition = getCurrent();
                    if (condition) setActive(true);
                }}
                round
                disabled={disabled}
            />
            <Button
                severity="success"
                icon="icon-check"
                fontSize="xxl"
                onClick={() => {
                    handleLike();
                }}
                round
                fontColor="light-primary"
                disabled={disabled}
            />
            <ComplaintPopup
                active={active}
                setActive={setActive}
                callback={(complaintId) => {
                    if (!complaintId) {
                        setPopupError('Что-то пошло не так');

                        return;
                    }
                    handleComplaint(complaintId);
                }}
                popupError={popupError}
            />
        </div>
    );
};

export default CardControllers;
