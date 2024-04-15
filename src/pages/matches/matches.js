import matches from './match.hbs';
import matchTemp from './components/card.hbs';
import apiHandler from '../../api/apiHandler';
import { store } from '../../..';
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

class Matches {
  /**
   * Отображает новый мэтч на странице
   * @param {Object} matchData - данные карточки
   */
  async appendNewMatch(matchData) {
    const matches = document.querySelector('#matches__content');
    if (matches === null) {
      return;
    }

    const match = document.createElement('div');
    match.innerHTML = matchTemp({
      image: matchData.photos[0] ? matchData.photos[0].url : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp',
      name: matchData.name,
      age: getAge(matchData.birthday),
      description: matchData.description,
    });
    matches.appendChild(match.firstElementChild);
  }
  /**
   * Отображает страницу
   */
  async render() {
    return matches();
  }
  /**
  * Функуция-контролер для обработки событий на странице.
  */
  async controller() {
    subscribeHeader(store);
    loadHeader(store);

    // const navbar = {avatar: ''}

    // store.subscribe((state) => {
    //   if (state) {
    //     navbar.avatar = state.avatar;
    //   }
    // });

    let persons = await apiHandler.GetMatches();
    persons = await persons.json();
    // persons = JSON.parse(persons);
    if(persons.length === 0) {
      const matches = document.querySelector('.matches');
      matches.innerHTML = '<div class="matches__empty">Пока нет новых кандидатов</div>';
    }
    persons.forEach((match) => {
      this.appendNewMatch(match);
    });
  }
}

export default Matches;
