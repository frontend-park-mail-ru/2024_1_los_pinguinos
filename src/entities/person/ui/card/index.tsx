import { Person } from '../../model/index';
// import styles from './index.css';
import { getAge } from '../../../../shared/lib'
import { useState } from '../../../../reactor';

const Card = ({ person }: { person: Person }) => {
    console.log(person);

    const [isFlipped, setIsFlipped] = useState(false);
    
    return (
        <div 
        onClick={() => {
            setIsFlipped(!isFlipped);
            console.log(isFlipped);
            console.log(person.id);
        }}
        style={{zIndex: person.id}}
        key={person.id} 
        className='card'
        >
            <div 
            className={`card__front ${isFlipped ? 'card__front-flip' : ''}`}
            >
                <div className='card__image'>
                    <img src={person.photos[0]} alt={person.name} className='card__img-content' />
                </div>
                <div className='card__content'>
                    <p className='card__name'>{person.name}, {getAge(person.birthday)}</p>
                </div>
            </div>
            <div 
            className={`card__back ${isFlipped ? 'card__back-flip' : ''}`}
            >
                <div className='card__back-content'>
                    <p className='card__back-header'>О себе</p>
                    <p className='card__description'>{person.description}</p>
                    <p className='card__back-header'>Интересы</p>
                    <div className='card__interests'>
                        {person.interests.map((interest, index) => (
                            <span className='card__interest'>{interest.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
