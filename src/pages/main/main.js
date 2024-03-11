import main from './main.hbs';
import Card from './components/card/card.js';
import { persons } from './persons.js';
import authHandler from '../../api/auth.js';

/**
* Возвращает возраст по дате рождения
* @param {string} dateString - дата рождения в формате 'YYYY-MM-DD'
* @returns {number} - возраст
*/
const getAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

/**
* Класс представляющий главную страницу
*/
class Home {
  cardCount = 0;
  cardsPerLoad = 5;
  /**
  * Возвращает массив карточек с сервера
  * @returns {Promise<Array>} - массив карточек
  */
  async getCards() {
    return await authHandler.sendRequest(authHandler.cardsURL);
  }

  /**
  * Отображает новую карточку на странице
  * @param {Object} cardData - данные карточки
  */
  async appendNewCard(cardData) {
    const swiper = document.querySelector('#swiper');
    if (swiper === null) {
      return;
    }

    if (this.cardCount >= persons.length) {
      const newCards = await this.getCards();
        persons.push(...newCards);
    }

    const card = new Card({
      id: this.cardCount,
      imageUrl: cardData.gender === 'М' ? 'https://source.unsplash.com/random/1000x1000/?man' : 'https://source.unsplash.com/random/1000x1000/?woman',
      name: cardData.name,
      age: getAge(cardData.birthday),
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

  /**
  * Обрабатывает свайп карточки вправо с помощью кнопки (лайк)
  */
  async acceptCard() {
    const swiper = document.querySelector('#swiper');
    const card = swiper.querySelector('.card');
    setTimeout(() => {
      card.remove();
    }, 300);
  }
  /**
  * Обрабатывает свайп карточки влево с помощью кнопки (дизлайк)
  */
  async rejectCard() {
    const swiper = document.querySelector('#swiper');
    const card = swiper.querySelector('.card');
    setTimeout(() => {
      card.remove();
    }, 300);
  }
  /**
  * Рендерит (отображает) главную страницу
  */
  async render() {
    return main();
  }
  /**
  * Функуция-контролер для обработки событий на главной странице.
  */
  async controller() {
    let cards = await this.getCards();
    cards = JSON.parse(cards);

    for(let i = 0; i < this.cardsPerLoad; i++) {
      this.appendNewCard(cards[i]);
    }

    const acceptButton = document.querySelector('#accept');
    const rejectButton = document.querySelector('#reject');
    acceptButton.addEventListener('click', () => {
      this.acceptCard();
    });
    rejectButton.addEventListener('click', () => {
      this.rejectCard();
    });

  }

}

export default Home;
