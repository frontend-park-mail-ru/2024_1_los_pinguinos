import navbarTemplate from "./navbar.hbs";

class Navbar {
  subscribe() {
    store.subscribe((newState) => {
      const navbarName = document
        .getElementsByClassName("navbar__header__person__name")
        .item(0);
      console.log(newState, navbarName);
      if (navbarName) {
        navbarName.innerHTML = newState.name;
      }
    });
  }

  async render() {
    return navbarTemplate();
  }

  async controller() {
    this.navbar.innerHTML = await this.render();
  }
}

export default Navbar;
