import main from './main.hbs';
import Card from './components/card/card.js';
import { persons } from './persons.js';
import { getPeople } from '../../api/content.js';

class Home {
  cardCount = 0;

  cardsPerLoad = 6;

  // people = getPeople();

  appendNewCard() {
    const swiper = document.querySelector('#swiper');
    if(swiper === null) {
      return;
    }
    console.log(persons, this.cardCount, this.cardsPerLoad);
    const card = new Card({
      id: this.cardCount,
      imageUrl: persons[this.cardCount % this.cardsPerLoad].imageUrl ? persons[this.cardCount % this.cardsPerLoad].imageUrl : '',
      name: persons[this.cardCount % this.cardsPerLoad].name,
      age: persons[this.cardCount % this.cardsPerLoad].age,
      description: persons[this.cardCount % this.cardsPerLoad].description,
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
    for (let i = 0; i < this.cardsPerLoad; i++) {
      this.appendNewCard();
    }
  }

}

export default Home;
