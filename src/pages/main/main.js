import main from './main.hbs';
import Card from './components/card/card.js';
import apiHandler from '../../api/apiHandler.js';
import { store } from '../../../index.js';
import { subscribeHeader } from '../../components/basic/utils.js';
import { loadHeader } from '../../components/basic/utils.js';

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
  // cardCount = 0;
  // cardsPerLoad = 5;

  /**
  * Отображает новую карточку на странице
  * @param {Object} cardData - данные карточки
  */
  async appendNewCard(cardData) {
    const swiper = document.querySelector('#swiper');
    if (swiper === null) {
      return;
    }

    const card = new Card({
      id: cardData.id,
      images: cardData.photos,
      name: cardData.name,
      age: getAge(cardData.birthday),
      description: cardData.description,
      interests: cardData.interests,
      onDismiss: () => {
      },
      onLike: () => {
        apiHandler.LikeCard(cardData.id);
      },
      onDislike: () => {
        apiHandler.DislikeCard(cardData.id);
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
    const index = parseInt(card.getAttribute('index'));
    apiHandler.LikeCard(index);
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
    const index = parseInt(card.getAttribute('index'));
    apiHandler.DislikeCard(index)
    .then((response) => {
      console.log(response);
      if (response.data == 0) {
        console.log('notification');
        const notification = document.querySelector('.csat');
        notification.style.display = 'block';
      }
    });
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
    subscribeHeader(store);
    loadHeader(store);

    let cards = await apiHandler.GetCards();
    if (!(cards && cards.ok)) return;
    cards = await cards.json();
    cards.forEach(card => {
      this.appendNewCard(card);
    });

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
