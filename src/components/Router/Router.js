import apiHandler from '../../api/apiHandler';
/**
 * Router class
 * @class
 */
export class Router {
  /**
   * Creates instance of class Router.
   * @param {Route[]} routes - list of specified routes
   */
  constructor(routes) {
    this.routes = routes;
    this.init();
  }
  /**
   * Initializes DOM event listeners to capture page rerouting.
   * @function
   */
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
  /**
   * Redirect to specified page without reload
   * @function
   * @param {string} url - navigation url
   */
  navigateTo(url) {
    history.pushState(null, null, url);
    this.loadRoute();
  }
  /**
   * Loads route components and adds them into root inner html, redirects to specified route depending on auth status
   * @function
   */
  async loadRoute() {
    const route =
      this.routes.find((r) => r.path === location.pathname) ||
      this.routes.find((r) => r.path === '*');

    const rootHTML = document.getElementById('root');
    rootHTML.innerHTML = await route.component.render();
    if (route.component.controller) {
      await route.component.controller();
    }
    const logoutButton = document.getElementById('header__button--logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        apiHandler.Logout();
      });
    }
    const loginButton = document.getElementById('header__button');
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        this.navigateTo('/login');
      });
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
/**
 * Route class
 * @class
 */
export class Route {
  /**
   * Creates instance of class Route.
   * @param {string} path - request url
   * @param {Object} component - page component
   * @param {boolean} protect - wheter the route is protected
   * @param {string} redirectURL - redirection url
   */
  constructor(path, component, protect = false, redirectURL = null) {
    this.path = path;
    this.component = component;
    this.protected = protect;
    this.redirectOnAuth = redirectURL;
  }
}
