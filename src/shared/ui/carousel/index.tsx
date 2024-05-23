import { useState } from '../../../reactor';
import { Person } from '../../../entities/person/model/index';

/**
 * Компонент карусели для фотографий
 * @param { Person } person - Данные пользователя
 * @returns { JSX.Element } - Возвращает JSX-разметку карусели
 */
const Carousel = ({ person }: { person: Person }) => {
    const defaultImage = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
    const [current, setCurrent] = useState(0);
    const images = person.photos
        .map((photo) => photo.url)
        .filter((url) => url !== '').length > 0
        ? person.photos.map((photo) => photo.url).filter((url) => url !== '')
        : [defaultImage];
    const currentCard = document.getElementById(`card-${person.id}`);
    const imageSlides = currentCard?.getElementsByClassName('slide-image');

    /**
     * Переключение на следующее изображение
     * @param { any } e - Событие клика
     * @returns { void } - Ничего не возвращает
     */
    const nextImage = (e: any) => {
        e.stopPropagation();
        let newIndex = current === images.length - 1 ? 0 : current + 1;
        imageSlides[current].className = 'slide-image leftOut';
        imageSlides[newIndex].className = 'slide-image leftIn';
        setCurrent(newIndex);
    };

    /**
     * Переключение на предыдущее изображение
     * @param { any } e - Событие клика
     * @returns { void } - Ничего не возвращает
     */
    const prevImage = (e: any) => {
        e.stopPropagation();
        let newIndex = current === 0 ? images.length - 1 : current - 1;
        imageSlides[current].className = 'slide-image rightOut';
        imageSlides[newIndex].className = 'slide-image rightIn';
        setCurrent(newIndex);
    };

    return (
        <div className="gallery-container">
            {images.length > 1 && (
                <div>
                    <span className="button-prev" onClick={prevImage}>
                        &#10094;
                    </span>
                    <span className="button-next" onClick={nextImage}>
                        &#10095;
                    </span>
                </div>
            )}
            <div className="gallery-track">
                {images.map((image, index) => {
                    return (
                        <img
                            className="slide-image"
                            src={image}
                            style={
                                index === 0
                                    ? {
                                          transform: 'translateX(0%)',
                                      }
                                    : {
                                          transform: 'translateX(100%)',
                                      }
                            }
                        ></img>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
