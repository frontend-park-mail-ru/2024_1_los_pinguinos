import Card from '../../../entities/person/ui/card';
import {useState, useEffect } from '../../../reactor';
import { getCards } from '../../../entities/person/api';

const CardsList = () => {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        getCards().then((response) => {
            setCards(response);
        });
    }, []);

    return (
        <div id='swiper'>
            {cards.map((card, index) =>
            {Card({person: card})}
            )}
        </div>
    );
};

export default CardsList;
