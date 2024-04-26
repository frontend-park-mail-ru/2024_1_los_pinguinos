import { clearVDOM, render } from '../reactor/index'
/**
 * Router class
 * @class
 */
export class Router {
    routes: any;
    /**
     * Creates instance of class Router.
     * @param {Route[]} routes - list of specified routes
     */
    constructor(routes: Route[]) {
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
    }
    /**
     * Navigates to specified page without reload, creates new history entry
     * @function
     * @param {string} url - navigation url
     */
    navigateTo(url: string) {
        history.pushState(null, null, url);
        this.loadRoute();
    }
    /**
     * Redirect to specified page without reload, does not create new history entry
     * @function
     * @param {string} url - redirection url
     */
    redirectTo(url: string) {
        history.replaceState(null, null, url);
        this.loadRoute();
    }
    /**
     * Loads route components and adds them into root inner html, redirects to specified route depending on auth status
     * @function
     */
    async loadRoute() {
        const route =
            this.routes.find((r : Route) => r.path === location.pathname) ||
            this.routes.find((r: Route) => r.path === '*');

        if (route.protected) {
            console.log('protected');
        }

        if (route.redirectOnAuth) {
            console.log('redirect');
        }
        // render
        const rootElement = document.getElementById('root');
        if (rootElement.innerHTML != '') {
            clearVDOM();
        }
        render(<route.component />, rootElement);
    }
}
/**
 * Route class
 * @class
 */
export class Route {
    path: string;
    component: Function;
    protected: boolean;
    redirectOnAuth: string;
    /**
     * Creates instance of class Route.
     * @param {string} path - request url
     * @param {Function} component - page component
     * @param {boolean} protect - wheter the route is protected
     * @param {string} redirectURL - redirection url
     */
    constructor(path: string, component: Function, protect: boolean = false, redirectURL: string = null) {
        this.path = path;
        this.component = component;
        this.protected = protect;
        this.redirectOnAuth = redirectURL;
    }
}