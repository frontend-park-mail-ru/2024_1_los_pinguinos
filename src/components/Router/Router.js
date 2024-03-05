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

    if (route.protect) {
      console.log("i am in protected route");
      const isAuth = await this.checkAuth();
      if (!isAuth) {
        console.log("i am in protected route");
        this.navigateTo('/login');
        console.log("i am in protected route");
        return;
      }
    }

    document.getElementById('root').innerHTML = await route.component.render();
    if (route.component.controller) {
      await route.component.controller();
    }
  }

  async checkAuth() {
    const token = localStorage.getItem('token');
    return !!token;
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
