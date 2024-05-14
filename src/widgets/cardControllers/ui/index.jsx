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

    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [movePoint, setMovePoint] = useState({ x: 0, y: 0 });

    useEffect(() => {
        console.log('ACTIVE SET');
    }, [disabled]);
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

    const handleLike = async () => {
        const currentCard = getCurrent();
        if (!currentCard) return;

        try {
            await like(currentCard);
        } catch {
            return;
        }

        setMovePoint({ x: 1, y: 0 });
        store.dispatch({ type: 'UPDATE_CURRENT_CARD', payload: currentCard });
        const cards = document.querySelectorAll('.card');
        const currentcard = cards[cards.length - 1];

        const flyX = (Math.abs(-1) / 1) * innerWidth * 1.3;
        const flyY = 0;
        currentcard.style.transform = `translate(${flyX}px, ${flyY}px) rotate(${flyX / innerWidth * 50}deg)`;
        currentcard.style.transition = `transform ${innerWidth}ms ease-in-out`;
        setTimeout(() => {
            currentcard.remove();
        }, innerWidth);
    };

    const handleComplaint = async () => {
        const currentCard = getCurrent();
        if (!currentCard) return;
        try {
            await complain({ reciever: currentCard });
        } catch {
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

        setMovePoint({ x: -1, y: 0 });

        store.dispatch({ type: 'UPDATE_CURRENT_CARD', payload: currentCard });
        const cards = document.querySelectorAll('.card');
        const currentcard = cards[cards.length - 1];
        console.log(currentcard);

        const flyX = (Math.abs(-1) / -1) * innerWidth * 1.3;
        const flyY = 0;
        currentcard.style.transform = `translate(${flyX}px, ${flyY}px) rotate(${flyX / innerWidth * 50}deg)`;
        currentcard.style.transition = 'transform ${innerWidth}ms ease-in-out';
        setTimeout(() => {
            currentcard.remove();
        }, innerWidth);
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
                    setActive(true);
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
                callback={() => {}}
            ></ComplaintPopup>
        </div>
    );
};

export default CardControllers;
