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
      if (e.target.matches('[data-link-persistent]')) {
        e.preventDefault();
        this.redirectTo(e.target.href);
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
  redirectTo(url) {
    // console.log("REDIRECT ATTEMPT TO URL ", url)
    history.replaceState(null, null, url);
    this.loadRoute();
  }
  /**
   * Loads route components and adds them into root inner html, redirects to specified route depending on auth status
   * @function
   */
  async loadRoute() {
    if (apiHandler.authStatus === undefined) {
      await apiHandler.CheckAuth();
    }
    const route =
      this.routes.find((r) => r.path === location.pathname) ||
      this.routes.find((r) => r.path === '*');

    if (route.protected) {
      // console.log('PROTECTED ROUTE');
      if (!apiHandler.authStatus) {
        // console.log("AUTH STATUS ", apiHandler.authStatus);
        this.redirectTo('/login');

        return;
      }
    }

    if (route.redirectOnAuth) {
      if (apiHandler.authStatus) {
        this.redirectTo(route.redirectOnAuth);

        return;
      }
    }

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

    const registerbuttons = document.getElementsByClassName('landing-button');
    for (const button of registerbuttons) {
      button.addEventListener('click', () => {
        this.navigateTo('/register');
      });
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
