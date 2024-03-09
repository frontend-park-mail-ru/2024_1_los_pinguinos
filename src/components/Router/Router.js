import authHandler from "../../api/auth";

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

    const rootHTML = document.getElementById('root');
    rootHTML.innerHTML = await route.component.render();
    if (route.component.controller) {
      await route.component.controller();
    }

    const authStatus = localStorage.getItem('sid') === 'true';
    if (route.protected) {
      if (!authStatus) {
        this.navigateTo('/login');
      }
    }
    if (route.redirectOnAuth !== null) {
      if (authStatus) {
        this.navigateTo(route.redirectOnAuth);
      }
    }
  }
}

// Route.js
export class Route {
  constructor(path, component, protect = false, redirectURL = null) {
    this.path = path;
    this.component = component;
    this.protected = protect;
    this.redirectOnAuth = redirectURL;
  }
}