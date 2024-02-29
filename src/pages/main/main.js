import main from './main.hbs';
import { appendNewCard } from './append';
// variables

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
