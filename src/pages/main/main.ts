import CardsList from "../../widgets/cardsList";
import CardController from "../../widgets/cardsController";

class MainPage {

    render() {
        const cardsList = new CardsList();
        cardsList.render();

        const controller = new CardController();
        controller.render();
        
    }
}

export default MainPage;