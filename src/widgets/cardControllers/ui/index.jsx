import { complain } from '../../../features/complain/api';
import { like, dislike } from '../../../features/like/api';
import { Button } from '../../../shared/ui';
import { store } from '../../../app/app';
import { useState, useEffect } from '../../../reactor/index';
import ComplaintPopup from '../../complaintPopup/ui/complaintPopup';

/**
 * Виджет управления карточками
 * @returns {JSX.Element} Виджет управления карточками
 */
const CardControllers = () => {
    const [active, setActive] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const state = store.getState();
        setCounter(state.currentCard);
    }, [store.getState().currentCard]);

    useEffect(() => {
        console.log('ACTIVE SET');
    }, [disabled]);

    /**
     * Получить текущую карточку
     * @returns {number} Идентификатор текущей карточки
     * @returns {null} null
     */
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
    }, [counter]);

    /**
     * Обработчик нажатия кнопки "Лайк"
     * @returns {void}
     */
    const handleLike = async () => {
        const currentCard = getCurrent();
        if (!currentCard) return;

        try {
            await like(currentCard);
        } catch {
            return;
        }

        store.dispatch({ type: 'UPDATE_CURRENT_CARD', payload: currentCard });
        const currentcard = document.getElementById(`card-${currentCard}`);

        const flyX = (Math.abs(-1) / 1) * innerWidth * 1.3;
        const flyY = 0;
        currentcard.style.transform = `translate(${flyX}px, ${flyY}px) rotate(${
            (flyX / innerWidth) * 50
        }deg)`;
        currentcard.style.transition = `transform ${innerWidth}ms ease-in-out`;
        setTimeout(() => {
            currentcard.remove();
        }, 500);
    };

    const [complete, setComplete] = useState(true);
    const [popupError, setPopupError] = useState('');
    /**
     * Обработчик кнопки "Пожаловаться"
     * @param {number} complaintId - Идентификатор жалобы
     * @returns {void}
     */
    const handleComplaint = async (complaintId = 1) => {
        setPopupError('');
        const currentCard = getCurrent();
        if (!currentCard) return;
        try {
            await complain({ id: complaintId, reciever: currentCard });
            setComplete(true);
            setTimeout(() => {
                setActive(false);
            }, 800);
            setTimeout(() => {
                setComplete(false);
            }, 1000);
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

    /**
     * Обработчик кнопки "Дизлайк"
     * @returns {void}
     */
    const handleDislike = async () => {
        const currentCard = getCurrent();
        if (!currentCard) return;

        try {
            await dislike(currentCard);
        } catch {
            return;
        }

        store.dispatch({ type: 'UPDATE_CURRENT_CARD', payload: currentCard });
        const currentcard = document.getElementById(`card-${currentCard}`);
        // console.log(currentcard);

        const flyX = (Math.abs(-1) / -1) * innerWidth * 1.3;
        const flyY = 0;
        currentcard.style.transform = `translate(${flyX}px, ${flyY}px) rotate(${
            (flyX / innerWidth) * 50
        }deg)`;
        currentcard.style.transition = 'transform ${innerWidth}ms ease-in-out';
        setTimeout(() => {
            currentcard.remove();
        }, 500);
        // currentcard.remove();
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
                    if (condition) {
                        setActive(true);
                        setComplete(false);
                    }
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
            {ComplaintPopup({
                active: active,
                setActive: setActive,
                complete: complete,
                callback: (complaintId) => {
                    if (!complaintId) {
                        setPopupError('Что-то пошло не так');
                    }
                    handleComplaint(complaintId);
                },
                popupError: popupError,
            })}
        </div>
    );
};

export default CardControllers;
