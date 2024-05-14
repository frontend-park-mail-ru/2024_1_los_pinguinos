import { Person } from '../../model/index';
// import styles from './index.css';
import { getAge } from '../../../../shared/lib';
import { useState } from '../../../../reactor';
import { like, dislike } from '../../../../features/like/api';

type StartPoint = {
    x: number;
    y: number;
} | null;

const Card = ({ person }: { person: Person }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [startPoint, setStartPoint] = useState<StartPoint>(null);
    const [movePoint, setMovePoint] = useState<StartPoint>(null);

    function onPointerDown({ clientX, clientY }: any) {
        setStartPoint({ x: clientX, y: clientY });

        const card = document.getElementById(`card-${person.id}`);
        card?.addEventListener('pointermove', onPointerMove);
        card?.addEventListener('pointerup', onPointerUp);
        card?.addEventListener('pointerleave', onPointerUp);
    }

    function onPointerMove({ clientX, clientY }: any) {
        if (!startPoint) {
            return;
        }

        setMovePoint({ x: clientX - startPoint.x, y: clientY - startPoint.y });
        setTransform(movePoint?.x, movePoint?.y, movePoint?.x / innerWidth * 50);
    }

    function setTransform(x: number, y: number, rotate: number, duration: number = 0) {
        const card = document.getElementById(`card-${person.id}`);
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;

        if(duration > 0) {
            card.style.transition = `transform ${duration}ms ease-in-out`;
        }
    }

    function onPointerUp() {
        if (!startPoint) {
            return;
        }

        const swiper = document.getElementById(`swiper`);
        const currentCard = document.getElementById(`card-${person.id}`);
        currentCard?.removeEventListener('pointermove', onPointerMove);
        currentCard?.removeEventListener('pointerup', onPointerUp);
        currentCard?.removeEventListener('pointerleave', onPointerUp);

        if ( Math.abs(movePoint!.x) > swiper?.clientWidth / 2) {
            currentCard?.removeEventListener('pointerdown', onPointerDown);
            like(person.id);
            complete();
        } else{
            dislike(person.id);
            cancel();
        }
    }

    function complete() {
        const flyX = (Math.abs(movePoint!.x) / movePoint!.x) * innerWidth * 1.3;
        const flyY = (movePoint!.y / movePoint!.x) * flyX;
        setTransform(flyX, flyY, flyX / innerWidth * 50, innerWidth);

        setTimeout(() => {
            const card = document.getElementById(`card-${person.id}`);
            card?.remove();
        }, innerWidth);

    }

    function cancel() {
        setTransform(0, 0, 0, 100);
        const card = document.getElementById(`card-${person.id}`);
        setTimeout(() => {
            card.style.transition = ``;
        }, 100);
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
                    <img
                        src={
                            person.photos &&
                            person.photos[0] &&
                            person.photos[0].url != ''
                                ? person.photos[0].url
                                : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                        }
                        alt={person.name}
                        className="card__img-content"
                    />
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
