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

  async render() {
    return matches();
  }

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

    persons.forEach((match) => {
      this.appendNewMatch(match);
    });
  }
}

export default Matches;
