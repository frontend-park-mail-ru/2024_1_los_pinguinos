import { getCards } from "../../entities/person/api";
import Card from "../../entities/person/ui/card";
class CardsList {
    constructor() {
        
    }

    cards = getCards();

    render () {
        this.cards.then((cards) => {
            cards.forEach((card) => {
                const cardComponent = new Card(card);
                cardComponent.render();
            });
        });
    }
}

export default CardsList;