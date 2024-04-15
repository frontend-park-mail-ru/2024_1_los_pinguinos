import cardTemplate from './card.hbs';
import apiHandler from '../../../../api/apiHandler';
/**
 * Класс предоставляющий карточку
 */
class Card {
  /**
   * Создает новый экземпляр карточки
   * @param {id} id - идентификатор карточки
   * @param {string} imageUrl - URL изображения
   * @param {string} name - имя человека на карточке
   * @param {number} age - возраст человека на карточке
   * @param {string} description - описание человека на карточке
   * @param {function} onDismiss - обработчик события "исчезновения карточки"
   * @param {function} onLike - обработчик события "лайк"
   * @param {function} onDislike - обработчик события "дизлайк"
   */
  constructor({ id, images, name, age, description, interests, onDismiss, onLike, onDislike }) {
    this.id = id;
    this.imageUrl = images.length > 0 ? images[0]['url'] : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
    this.name = name;
    this.age = age;
    this.description = description;
    this.interests = interests;
    this.onDismiss = onDismiss;
    this.onLike = onLike;
    this.onDislike = onDislike;
    this.#init();
  }

  #startPoint;
  #offsetX;
  #offsetY;
  /**
   * Проверят, является ли устройство сенсорным
   * @returns {boolean} - true, если устройство сенсорное, иначе - false
   */
  #isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  };
  /**
   * Инициализирует данные карточки и добавляет обработчики событий в зависимости от типа устройства
   */
  #init = () => {
    const card = document.createElement('div');
    card.innerHTML = cardTemplate({index: this.id, image: this.imageUrl, name: this.name, age: this.age, description: this.description, interests: this.interests});
    this.element = card.firstElementChild; // Получаем первый элемент-потомок, который содержит сгенерированный HTML
    if (this.#isTouchDevice()) {
      this.#listenToTouchEvents();
    } else {
      this.#listenToMouseEvents();
    }
  };
  /**
   * Добавляет обработчики событий для сенсорных устройств
   */
  #listenToTouchEvents = () => {
    this.element.addEventListener('touchstart', (e) => {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY };
      document.addEventListener('touchmove', this.#handleTouchMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('touchend', this.#handleTouchEnd);
    document.addEventListener('cancel', this.#handleTouchEnd);
  };
  /**
   * Добавляет обработчики событий для устройств с мышью
   */
  #listenToMouseEvents = () => {
    this.element.addEventListener('mousedown', (e) => {
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY };
      document.addEventListener('mousemove', this.#handleMouseMove);
      this.element.style.transition = 'transform 0s';
    });

    document.addEventListener('mouseup', this.#handleMoveUp);

    // prevent card from being dragged
    this.element.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  };
  /**
   * Обрабатывает событие движения
   * @param {number} x - координата куросора по оси х
   * @param {тгьиук} y - координата куросора по оси у
   */
  #handleMove = (x, y) => {
    this.#offsetX = x - this.#startPoint.x;
    this.#offsetY = y - this.#startPoint.y;
    const rotate = this.#offsetX * 0.1;
    this.element.style.transform = `translate(${this.#offsetX}px, ${
      this.#offsetY
    }px) rotate(${rotate}deg)`;
    // исчезновение карточки при достижени определенного смещения
    if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    }
  };

  /**
   * Обрабатывает событие движения мыши
   * @param {Event} e - событие движения мыши
   */
  #handleMouseMove = (e) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  };
  /**
   * Обрабатывает событие отпускания кнопки мыши
   */
  #handleMoveUp = () => {
    this.#startPoint = null;
    document.removeEventListener('mousemove', this.#handleMouseMove);
    this.element.style.transform = '';
  };

  /**
   * Обрабатывает событие движения пальцем по сенсорнному устройства
   * @param {Event} e - событие движения пальцем
   */
  #handleTouchMove = (e) => {
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  };
  /**
   * Обрабатывает событие отпускания пальца от сенсорного устройства
   */
  #handleTouchEnd = () => {
    this.#startPoint = null;
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transform = '';
  };
  /**
   * Исчезновение карточки с учетом напрвления
   * @param {number} direction - направление исчезновения
   */
  #dismiss = (direction) => {
    this.#startPoint = null;
    document.removeEventListener('mouseup', this.#handleMoveUp);
    document.removeEventListener('mousemove', this.#handleMouseMove);
    document.removeEventListener('touchend', this.#handleTouchEnd);
    document.removeEventListener('touchmove', this.#handleTouchMove);
    this.element.style.transition = 'transform 1s';
    this.element.style.transform = `translate(${
      direction * window.innerWidth
    }px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
    this.element.classList.add('dismissing');
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    if (typeof this.onDismiss === 'function') {
      this.onDismiss();
    }
    if (typeof this.onLike === 'function' && direction === 1) {
      // this.onLike();
      apiHandler.LikeCard(this.id);
    }
    if (typeof this.onDislike === 'function' && direction === -1) {
      apiHandler.DislikeCard(this.id);
    }
  };

}

export default Card;
