import main from './main.hbs';
import Card from './components/card/card.js';

// constants
const urls = [
  'https://source.unsplash.com/random/1000x1000/?sky',
  'https://source.unsplash.com/random/1000x1000/?landscape',
  'https://source.unsplash.com/random/1000x1000/?ocean',
  'https://source.unsplash.com/random/1000x1000/?moutain',
  'https://source.unsplash.com/random/1000x1000/?forest',
];

const names = [
  'John Doe',
  'Jane Doe',
  'Alice',
  'Bob',
  'Charlie',
];

const ages = [
  20,
  21,
  22,
  23,
  24,
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

// variables
let cardCount = 0;
function appendNewCard() {
  console.log('appendNewCard');
  const swiper = document.querySelector('#swiper');
  const like = document.querySelector('#like');
  const dislike = document.querySelector('#dislike');
  const card = new Card({
    id: cardCount,
    imageUrl: urls[cardCount % 5] ? urls[cardCount % 5] : "https://via.placeholder.com/500", 
    name: names[cardCount % 5],
    age: ages[cardCount % 5],
    description: descriptions[cardCount % 5],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = 'running';
      like.classList.toggle('trigger');
    },
    onDislike: () => {
      dislike.style.animationPlayState = 'running';
      dislike.classList.toggle('trigger');
    },
  });
  console.log(card);
  // swiper.append(card.element);
  swiper.appendChild(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll('.card:not(.dismissing)');
  cards.forEach((card, index) => {
    card.style.setProperty('--i', index);
  });
}

class Home {

  async render() {
    return main();
  }

  async controller() {
    // first 5 cards
    for (let i = 0; i < 5; i++) {
      appendNewCard();
    }
  }
}

export default Home;
