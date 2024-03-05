import main from './main.hbs';
import Card from './components/card/card.js';
import { persons } from './persons.js';
import { getCards } from '../../api/content.js'; 

class Home {
  cardCount = 0;
  cardsPerLoad = 6;
  loadedCards = 0;

  // Метод для загрузки карточек из API и сохранения в массив persons
  async getPersons() {
    const cards = await getCards();
    cards.forEach((card) => {
      persons.push(card);
    });
  }

  // Метод для добавления новой карточки
  appendNewCard() {
    const swiper = document.querySelector('#swiper');
    if(swiper === null) {
      return;
    }
    // Проверяем, достигнуто ли максимальное количество карточек
    if (this.loadedCards < persons.length) {
      const card = new Card({
        id: this.cardCount,
        imageUrl: persons[this.loadedCards].imageUrl ? persons[this.loadedCards].imageUrl : '',
        name: persons[this.loadedCards].name,
        age: persons[this.loadedCards].age,
        description: persons[this.loadedCards].description,
        onDismiss: this.appendNewCard.bind(this),
        onLike: () => {
          // Действия при нажатии кнопки "Нравится"
        },
        onDislike: () => {
          // Действия при нажатии кнопки "Не нравится"
        },
      });
      swiper.appendChild(card.element);
      this.loadedCards++;
    }
  }

  // Метод для проверки прокрутки страницы и загрузки дополнительных карточек при необходимости
  async checkScroll() {
    const swiper = document.querySelector('#swiper');
    if (swiper !== null) {
      const lastCard = swiper.lastElementChild;
      const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (pageOffset > lastCardOffset - 20) { // Загружаем новые карточки, когда пользователь доскроллил до последней карточки с отступом 20px
        this.appendNewCard();
      }
    }
  }

  async render() {
    return main();
  }

  async controller() {
    await this.getPersons();
    window.addEventListener('scroll', () => {
      this.checkScroll();
    });
    for (let i = 0; i < this.cardsPerLoad; i++) {
      this.appendNewCard();
    }
  }

}

export default Home;
