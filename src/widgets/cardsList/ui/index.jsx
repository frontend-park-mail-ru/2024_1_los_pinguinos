import Card from '../../../entities/person/ui/card';
import { useState, useEffect } from '../../../reactor';
import { getCards } from '../../../entities/person/api';

const CardsList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        getCards().then((response) => {
            console.log(response);
            setCards(response);
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
