import matchs from './match.hbs';
import matchTemp from './components/card.hbs';

const persons = [
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Alice',
    age: 24,
    description: 'dfsdfsdg fgdfgdgf fgdgdg',
  },
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Alice',
    age: 24,
    description: 'dfsdfsdg fgdfgdgf fgdgdg',
  },
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Alice',
    age: 24,
    description: 'dfsdfsdg fgdfgdgf fgdgdg',
  },
  {
    image: 'https://source.unsplash.com/random/1000x1000/?woman',
    name: 'Alice',
    age: 24,
    description: 'dfsdfsdg fgdfgdgf fgdgdg',
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
