import Card from '../../../entities/person/ui/card';
import { useState, useEffect } from '../../../reactor';
import { getCards } from '../../../entities/person/api';
import { store } from '../../../app/app';
import { Person } from '../../../entities/person/model';
import { EyeLoader } from '../../index';
import { clsx } from '../../../shared/lib/clsx';

const CardsList = () => {
    const [cards, setCards] = useState<Person[]>([]);
    const [visibleCards, setVisibleCards] = useState<Person[]>([]);
    const [counter, setCounter] = useState(10);
    useEffect(() => {
        getCards()
            .then((response) => {
                setCards(response);
                setLoader(false);
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
                setLoader(false);
            });
    }, []);

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            setCounter(state.currentCard);
        });
    }, []);

    useEffect(() => {
        const remainCards = cards.filter(
            (card) => !visibleCards.includes(card),
        );

        const cards1 = document.querySelectorAll('.card');
        if (cards1.length == 1) {
            if (remainCards.length > 0)
                setVisibleCards([...visibleCards, ...remainCards.slice(0, 3)]);
        }
    }, [counter]);

    const [loader, setLoader] = useState(true);

    return (
        <div id="swiper">
            <EyeLoader active={loader} placeholder="Ищем новые карточки..." />
            <p className={clsx('match__placeholder', loader && 'any--none')}>
                Карточки закончились. Приходите позже...
            </p>
            {visibleCards.map((card, index) => {
                return card ? Card({ person: card }) : null;
            })}
        </div>
    );
};

export default CardsList;
