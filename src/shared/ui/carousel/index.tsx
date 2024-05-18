import { useState } from '../../../reactor';
import { Person } from '../../../entities/person/model/index';

const Carousel = ({ person }: { person: Person }) => {
    const [current, setCurrent] = useState(0);
    const images = person.photos.map((photo) => photo.url).filter((url) => url !== '');
    const currentCard = document.getElementById(`card-${person.id}`);
    const imageSlides = currentCard?.getElementsByClassName('slide-image');
    console.log('images', images);
    console.log('imageSlides', imageSlides);

    const nextImage = (e: any) => {
        e.stopPropagation();
        console.log('nextImage');
        let newIndex = current === images.length - 1 ? 0 : current + 1;
        imageSlides[current].className = 'slide-image leftOut';
        imageSlides[newIndex].className = 'slide-image leftIn';
        setCurrent(newIndex);
    };

    const prevImage = (e: any) => {
        e.stopPropagation();
        console.log('prevImage');
        let newIndex = current === 0 ? images.length - 1 : current - 1;
        imageSlides[current].className = 'slide-image rightOut';
        imageSlides[newIndex].className = 'slide-image rightIn';
        setCurrent(newIndex);
    };

    // const jumpImage = (e: any) => {
    //     let jumpIndex = parseInt(e.target.id);
    //     if (jumpIndex === current) return;
    //     if (jumpIndex - current >= 0) {
    //         imageSlides[current].className = 'slide-image leftOut';
    //         imageSlides[jumpIndex].className = 'slide-image leftIn';
    //     } else {
    //         imageSlides[current].className = 'slide-image rightOut';
    //         imageSlides[jumpIndex].className = 'slide-image rightIn';
    //     }
    //     setCurrent(jumpIndex);
    // };

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
                        <div
                            className="slide-image"
                            style={
                                index === 0
                                    ? {
                                          backgroundImage: `url(${image})`,
                                          transform: 'translateX(0%)',
                                      }
                                    : {
                                          backgroundImage: `url(${image})`,
                                          transform: 'translateX(100%)',
                                      }
                            }
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
