import Card from '../../../entities/person/ui/card';
import { useState, useEffect } from '../../../reactor';
import { getCards } from '../../../entities/person/api';
import { store } from '../../../app/app';

const CardsList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        getCards().then((response) => {
            setCards(response);
            store.dispatch({type: 'UPDATE_CURRENT_CARD', payload: response[response.length - 1].id});
        });
    }, []);

    return (
        <div id="swiper">
            {cards.map((card, index) => (
                <Card person={card} key={index} />
            ))}
            {/* <Card person={cards[0]} key={0} /> */}
        </div>
    );
};

export default CardsList;
