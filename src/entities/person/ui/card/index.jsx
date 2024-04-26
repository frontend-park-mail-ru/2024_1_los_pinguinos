// import Person from '../../model/index'
import styles from './index.css';

const Card = ({ person }) => {
    return (
        <div className='card'>
            <div className='card__front'>
                <div className='card__image'>
                    <img src={person.image} alt={person.name} className='card__img-content' />
                </div>
                <div className='card__content'>
                    <p className={styles['card__name']}>{person.name}, {person.age}</p>
                </div>
            </div>
            <div className='card__back'>
                <div className='card__back-content'>
                    <p className='card__back-header'>О себе</p>
                    <p className='card__description'>{person.description}</p>
                    <p className='card__back-header'>Интересы</p>
                    <div className='card__interests'>
                        {person.interests.map((interest, index) => (
                            <span key={index} className='card__interest'>{interest}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
