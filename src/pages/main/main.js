// class Home {
//     async render() {
//         return '<h2>Добро пожаловать на главную страницу!</h2>';
//     }
// }

// export default Home;

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

  // variables
  let cardCount = 0;
  function appendNewCard() {
    const swiper = document.querySelector('#swiper');
    const like = document.querySelector('#like');
    const dislike = document.querySelector('#dislike');
    const card = new Card({
      imageUrl: urls[cardCount % 5],
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
