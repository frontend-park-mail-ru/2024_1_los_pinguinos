import main from './main.hbs';
import Card from './components/card/card.js';
import { persons } from './persons.js';
import { getCards } from '../../api/content.js';

class Home {
  cardCount = 0;
  cardsPerLoad = 5;
  // const persons = [];
  async appendNewCard() {
    const swiper = document.querySelector('#swiper');
    if (swiper === null) {
      return;
    }

    if (this.cardCount >= persons.length) {
      const newCards = await getCards();
        persons.push(...newCards);
    }

    const cardData = persons[this.cardCount % this.cardsPerLoad];

    const card = new Card({
      id: this.cardCount,
      imageUrl: cardData.imageUrl ? cardData.imageUrl : '',
      name: cardData.name,
      age: cardData.age,
      description: cardData.description,
      onDismiss: this.appendNewCard.bind(this),
      onLike: () => {

      },
      onDislike: () => {

      },
    });
    swiper.appendChild(card.element);
    this.cardCount++;

    const cards = swiper.querySelectorAll('.card:not(.dismissing)');
    cards.forEach((card, index) => {
      card.style.setProperty('--i', index);
    });
  }

  async render() {
    return main();
  }

  async controller() {
    for (let i = 0; i < persons.length; i++) {
      this.appendNewCard();
    }
  }

}

export default Home;