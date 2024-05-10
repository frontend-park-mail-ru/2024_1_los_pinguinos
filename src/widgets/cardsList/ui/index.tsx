import Card from '../../../entities/person/ui/card';
import { useState, useEffect } from '../../../reactor';
import { getCards } from '../../../entities/person/api';
import { store } from '../../../app/app';

const CardsList = () => {
    const [cards, setCards] = useState([]);
    const [visibleCards, setVisibleCards] = useState([]);
    const [counter, setCounter] = useState(10);
    useEffect(() => {
        getCards()
            .then((response) => {
                // console.log(response);
                setCards(response);
                // setInterval(() => {
                //     setCounter(counter-1);
                // }, 1000);
                if (response.length > 0) {
                    store.dispatch({
                        type: 'UPDATE_CURRENT_CARD',
                        payload: response[response.length - 1].id,
                    });
                    setVisibleCards(
                        response.slice(response.length - 3, response.length),
                    );
                }
            })
            .catch(() => {
                setCards([]);
            });
    }, []);

    const user = store.getState();

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            // console.log(state);
            setCounter(state.currentCard);
        });
    }, []);

    useEffect(() => {
        const remainCards = cards.filter(
            (card) => !visibleCards.includes(card),
        );
        // console.log(remainCards);
        // console.log(visibleCards);
        // console.log(remainCards[0]);
        // console.log('Карточка текущая', user.currentCard);

        const cards1 = document.querySelectorAll('.card');
        // console.log(remainCards);
        if (cards1.length == 0) {
            // console.log('Карточики пусты');
            // console.log('Не пиздеж', cards1.length);
            // console.log(remainCards[0]);
            if (remainCards.length > 0)
                setVisibleCards([...visibleCards, ...remainCards.slice(0, 3)]);
        }
    }, [counter]);

    return (
        <div id="swiper">
            <p
                style={{
                    fontSize: 'large',
                    fontWeight: '800',
                    color: 'white',
                    justifyContent: 'center',
                    marginTop: '50px',
                }}
            >
                Карточки закончились. Приходите позже
            </p>
            {visibleCards.map((card, index) => {
                // console.log(visibleCards);
                return card ? Card({ person: card }) : null;
            })}
        </div>
    );
};

export default CardsList;
