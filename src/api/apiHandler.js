import router from '../../index.js';

const localhost = 'http://localhost:8080';
const vm = 'http://185.241.192.216:8080';
const baseURL = vm;
const registrationURL = baseURL + '/registration';
const authenticationURL = baseURL + '/login';
const logoutURL = baseURL + '/logout';
const isAuthURL = baseURL + '/isAuth';
const cardsURL = baseURL + '/cards';
/**
 * APIHandler class
 * @author roflanpotsan
 * @class
 */
class APIHandler {
    /**
     * Creates instance of class APIHandler.
     * @author roflanpotsan
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
    }
    /**
     * Sends request to specified url with specified data via specified method.
     * @author roflanpotsan
     * @function
     * @param {string} url - request url
     * @param {Object} data - request data
     * @param {string} method - request method
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async sendRequest(url = this.baseURL, data = {}, method='GET') {
        try {
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
            if (!response.ok) {
                localStorage.setItem('sid', false);
                if (url !== this.authenticationURL && url !== this.registrationURL && url != this.logoutURL) {
                    router.navigateTo('/login');
                }
                throw new Error('Network response was not sucessfull');
            }
            if (!(url === this.registrationURL && method === 'GET')){
                localStorage.setItem('sid', true);
            }
            if (url === this.logoutURL) {
                localStorage.removeItem('sid');
            }
            const jsonData = await response.json();

            return jsonData;
        } catch (error) {
            return undefined;
        }
    }
    /**
     * Sends request for registration
     * @author roflanpotsan
     * @function
     * @param {Object} formData - registration form data
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async Register(formData) {
        return await this.sendRequest(this.registrationURL, formData, 'POST');
    }
    /**
     * Sends request for login
     * @author roflanpotsan
     * @function
     * @param {Object} formData - login form data
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async Login(formData) {
        return await this.sendRequest(this.authenticationURL, formData, 'POST');
    }
    /**
     * Sends request for logout
     * @author roflanpotsan
     * @function
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async Logout() {
        router.navigateTo('/');

        return await this.sendRequest(this.logoutURL);
    }
    /**
     * Sends request for registration interest choices
     * @author roflanpotsan
     * @function
     * @returns {Promise<Object | undefined>} - returns request result, undefined if unsuccessful
     */
    async GetInterests() {
        return await this.sendRequest(this.registrationURL);
    }
}

const apiHandler = new APIHandler();
export default apiHandler;
