import matchs from './match.hbs';
import matchTemp from './components/card.hbs';

const persons = [
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Alice',
    age: 24,
    description: 'Я тебя на бицепс жму, сладкий',
  },
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Gwen',
    age: 24,
    description: 'Ломаю арубузы бедрами',
  },
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Emma',
    age: 24,
    description: 'Мои глаза выше',
  },
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Bella',
    age: 24,
    description: 'Не лююлю разминать шею',
  },
];

class Matchs {
  async appendNewMatch(matchData) {
    const matches = document.querySelector('#matches__content');
    if (matches === null) {
      return;
    }

    const match = document.createElement('div');
    match.innerHTML = matchTemp({
      image: matchData.image,
      name: matchData.name,
      age: matchData.age,
      description: matchData.description,
    });
    matches.appendChild(match.firstElementChild);
  }

  async render() {
    return matchs();
  }

  async controller() {
    persons.forEach((match) => {
      this.appendNewMatch(match);
    });
  }
}

export default Matchs;
