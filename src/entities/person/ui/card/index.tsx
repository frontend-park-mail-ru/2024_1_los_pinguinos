import { Person } from '../../model/index';
// import styles from './index.css';
import { getAge } from '../../../../shared/lib/date';
import { useState } from '../../../../reactor';
import { like, dislike } from '../../../../features/like/api';
import { store } from '../../../../app/app';
import { Carousel } from '../../../../shared/ui';
import './index.css';
type StartPoint = {
    x: number;
    y: number;
} | null;

/**
 * Smart-компонент карточки
 * @param { Person } person - Данные пользователя
 * @returns { JSX.Element } - Возвращает JSX-разметку карточки
 */
const Card = ({ person }: { person: Person }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [startPoint, setStartPoint] = useState<StartPoint>({
        x: 0,
        y: 0,
    });
    const [movePoint, setMovePoint] = useState<StartPoint>({
        x: 0,
        y: 0,
    });
    /**
     * Обработчик нажатия на карточку
     * @param { any } event - Событие нажатия
     * @returns { void } - Ничего не возвращает
     */
    function onPointerDown({ clientX, clientY }: any) {
        setStartPoint({ x: clientX, y: clientY });

        const card = document.getElementById(`card-${person.id}`);
        card?.addEventListener('pointermove', onPointerMove);
        card?.addEventListener('pointerup', onPointerUp);
        card?.addEventListener('pointerleave', onPointerUp);
    }

    /**
     * Обработчик движения карточки
     * @param { any } event - Событие движения
     * @returns { void } - Ничего не возвращает
     */
    function onPointerMove({ clientX, clientY }: any) {
        if (!startPoint) {
            return;
        }

        setMovePoint({ x: clientX - startPoint.x, y: clientY - startPoint.y });
        setTransform(
            movePoint?.x,
            movePoint?.y,
            (movePoint?.x / innerWidth) * 50,
        );
    }

    /**
     * Обработчик изменения карточки
     * @param { number } x - Координата x
     * @param { number } y - Координата y
     * @param { number } rotate - Угол поворота
     * @param { number } duration - Длительность анимации
     * @returns { void } - Ничего не возвращает
     */
    function setTransform(
        x: number,
        y: number,
        rotate: number,
        duration: number = 0,
    ) {
        const card = document.getElementById(`card-${person.id}`);
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;

        if (duration > 0) {
            card.style.transition = `transform ${duration}ms ease-in-out`;
        }
    }

    /**
     * Обработчик поднятия нажатия с карточки
     * @returns { void } - Ничего не возвращает
     */
    function onPointerUp() {
        if (!startPoint) {
            return;
        }

        const swiper = document.getElementById(`swiper`);
        const currentCard = document.getElementById(`card-${person.id}`);
        currentCard?.removeEventListener('pointermove', onPointerMove);
        currentCard?.removeEventListener('pointerup', onPointerUp);
        currentCard?.removeEventListener('pointerleave', onPointerUp);

        if (Math.abs(movePoint!.x) > swiper?.clientWidth / 2) {
            store.dispatch({
                type: 'UPDATE_CURRENT_CARD',
                payload: person.id,
            });
            currentCard?.removeEventListener('pointerdown', onPointerDown);
            like(person.id);
            complete();
        } else {
            dislike(person.id);
            cancel();
        }
    }

    /**
     * Обработчик завершения анимации
     * @returns { void } - Ничего не возвращает
     */
    function complete() {
        const flyX = (Math.abs(movePoint!.x) / movePoint!.x) * innerWidth * 1.3;
        const flyY = (movePoint!.y / movePoint!.x) * flyX;
        setTransform(flyX, flyY, (flyX / innerWidth) * 50, innerWidth);

        setTimeout(() => {
            const card = document.getElementById(`card-${person.id}`);
            card?.remove();
        }, innerWidth);
    }

    /**
     * Обработчик отмены анимации
     * @returns { void } - Ничего не возвращает
     */
    function cancel() {
        setTransform(0, 0, 0, 100);
        const card = document.getElementById(`card-${person.id}`);
        setTimeout(() => {
            card.style.transition = ``;
        }, 500);
    }

    return (
        <div
            onClick={() => {
                setIsFlipped(!isFlipped);
            }}
            onPointerDown={onPointerDown}
            key={person.id}
            id={`card-${person.id}`}
            className="card"
        >
            <div
                className={`card__front ${isFlipped ? 'card__front-flip' : ''}`}
            >
                <div className="card__image">
                    <Carousel person={person} />
                    {/* <img
                        src={
                            person.photos &&
                            person.photos[0] &&
                            person.photos[0].url != ''
                                ? person.photos[0].url
                                : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                        }
                        alt={person.name}
                        className="card__img-content"
                    /> */}
                </div>
                <div className="card__content">
                    <p className="card__name">
                        {person.name}, {getAge(person.birthday)}
                    </p>
                </div>
            </div>
            <div className={`card__back ${isFlipped ? 'card__back-flip' : ''}`}>
                <div className="card__back-content">
                    <p className="card__back-header">О себе</p>
                    <p className="card__description">{person.description}</p>
                    <p className="card__back-header">Интересы</p>
                    <div className="card__interests">
                        {person.interests
                            ? person.interests.map((interest, index) => (
                                  <span className="card__interest">
                                      {interest.name}
                                  </span>
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
