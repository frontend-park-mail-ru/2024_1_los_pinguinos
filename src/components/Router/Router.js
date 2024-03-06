import AuthHandler from "../../api/auth";

const authHandler = new AuthHandler();

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener('load', () => this.loadRoute());
    window.addEventListener('popstate', () => this.loadRoute());
    document.body.addEventListener('click', (e) => {
      if (e.target.matches('[data-link]')) {
        e.preventDefault();
        this.navigateTo(e.target.href);
      }
    });
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.loadRoute();
  }

  async loadRoute() {
    const route =
      this.routes.find((r) => r.path === location.pathname) ||
      this.routes.find((r) => r.path === '*');
      console.log("ROUTE");

    if (route.protected) {
      console.log("i am in protected route");
      authHandler.isAuthenticated().then(result => {
        console.log(result);
        if (!result) { // либо я дурак либо бек не отвечает, почему??? T_T
          console.log(result);
          console.log("i am in protected route");
          this.navigateTo('/login');
          return;
        }
      });
    }

    document.getElementById('root').innerHTML = await route.component.render();
    if (route.component.controller) {
      await route.component.controller();
    }
  }
}

// Route.js
export class Route {
  constructor(path, component, protect = false) {
    this.path = path;
    this.component = component;
    this.protected = protect;
  }
}
