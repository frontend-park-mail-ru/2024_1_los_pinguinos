import matches from './match.hbs';
import matchTemp from './components/card.hbs';
import apiHandler from '../../api/apiHandler';

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
  async appendNewMatch(matchData, photo) {
    const matches = document.querySelector('#matches__content');
    if (matches === null) {
      return;
    }

    const match = document.createElement('div');
    match.innerHTML = matchTemp({
      image: Array.isArray(photo) ? photo[0] : photo ? photo : "https://los_ping.hb.ru-msk.vkcs.cloud/i.webp",
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

    let persons = await apiHandler.GetMatches();
    if (!persons) return;
    persons = await persons.json();

    persons.forEach((match) => {
      this.appendNewMatch(match.person, match.photo);
    });
  }
}

export default Matches;
