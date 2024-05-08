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
    console.log(person);
    const [isFlipped, setIsFlipped] = useState(false);

    // const [startPoint, setStartPoint] = useState<StartPoint>(null);
    // const [offsetX, setOffsetX] = useState(0);
    // const [offsetY, setOffsetY] = useState(0);

    // const isTouchDevice = () => {
    //     return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // };

    // const handleStart = (e) => {
    //     const { clientX, clientY } = isTouchDevice() ? e.changedTouches[0] : e;
    //     setStartPoint({ x: clientX, y: clientY });
    //     console.log('start', clientX, clientY);
    //     document.addEventListener(
    //         isTouchDevice() ? 'touchmove' : 'mousemove',
    //         handleMove,
    //     );
    // };

    // const handleMove = (e) => {
    //     const { clientX, clientY } = isTouchDevice() ? e.changedTouches[0] : e;
    //     if (startPoint) {
    //         setOffsetX(clientX - startPoint.x);
    //         setOffsetY(clientY - startPoint.y);
    //     }

    //     const rotate = offsetX * 0.1;
    //     e.target.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`;

    //     if (Math.abs(offsetX) > e.target.offsetWidth * 0.4) {
    //         dismiss(offsetX > 0 ? 1 : -1);
    //     }
    // };

    // const dismiss = (direction: number) => {
    //     setStartPoint(null);
    //     document.removeEventListener(
    //         isTouchDevice() ? 'touchmove' : 'mousemove',
    //         handleMove,
    //     );
    //     const card = document.getElementById(`card-${person.id}`);
    //     if (card) {
    //         card.style.transition = 'transform 1s';
    //         card.style.transform = `translate(${
    //             direction * window.innerWidth
    //         }px, ${offsetY}px) rotate(${direction * 30}deg)`;
    //         card.classList.add('dissmissing');
    //         setTimeout(() => {
    //             card.remove();
    //         }, 1000);
    //     }

    //     if (direction > 0) {
    //         like(person.id);
    //     } else {
    //         dislike(person.id);
    //     }
    // };

    return (
        <div
            onClick={() => {
                setIsFlipped(!isFlipped);
                // console.log(isFlipped);
                // console.log(person.id);
            }}
            // style={{ zIndex: person.id }}
            key={person.id}
            id={`card-${person.id}`}
            className="card"
            // onMouseDown={handleStart}
            // onTouchStart={handleStart}
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
