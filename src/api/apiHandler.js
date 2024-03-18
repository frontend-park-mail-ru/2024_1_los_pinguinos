import router from '../../index.js';

const localhost = 'http://127.0.0.1:8080';
const vm = 'http://185.241.192.216:8080';
const baseURL = localhost;
const registrationURL = baseURL + '/registration';
const authenticationURL = baseURL + '/login';
const logoutURL = baseURL + '/logout';
const isAuthURL = baseURL + '/isAuth';
const cardsURL = baseURL + '/cards';
/**
 * APIHandler class
 * @class
 */
class APIHandler {
    /**
     * Creates instance of class APIHandler.
     */
    constructor() {
        this.localhost = localhost;
        this.vm = vm;
        this.baseURL = baseURL;
        this.registrationURL = registrationURL;
        this.authenticationURL = authenticationURL;
        this.logoutURL = logoutURL;
        this.isAuthURL = isAuthURL;
        this.cardsURL = cardsURL;
        this.authStatus = undefined;
    }
    /**
     * Sends request to specified url with specified data via specified method.
     * @function
     * @param {string} url - request url
     * @param {Object} data - request data
     * @param {string} method - request method
     * @returns {Promise<Object>} - returns request response
     */
    async sendRequest(url = this.baseURL, data = {}, method='GET') {
        let response;
        if (method == 'GET') {
            response = await fetch(url, {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else if (method == 'POST') {
            response = await fetch(url, {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        }
        if (!response.ok || url === this.logoutURL) {
            this.authStatus = false;
        } else if (response.ok) {
            if (!(url === this.registrationURL && method === 'GET')){
                this.authStatus = true;
            }
        }

        return response;
    }
    /**
     * Sends request for registration
     * @function
     * @param {Object} formData - registration form data
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async Register(formData) {
        const response = await this.sendRequest(this.registrationURL, formData, 'POST');

        return response.status;
    }
    /**
     * Sends request for login
     * @function
     * @param {Object} formData - login form data
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async Login(formData) {
        const response = await this.sendRequest(this.authenticationURL, formData, 'POST');

        return response.status;
    }
    /**
     * Sends request for logout
     * @function
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async Logout() {
        router.navigateTo('/');

        return await this.sendRequest(this.logoutURL);
    }
    async CheckAuth() {
        return await this.sendRequest(this.isAuthURL);
    }
    /**
     * Sends request for registration interest choices
     * @function
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async GetInterests() {
        const response = await this.sendRequest(this.registrationURL);

        return await response.json();
    }
}

const apiHandler = new APIHandler();
export default apiHandler;
