import router from '../../index.js';

const localhost = 'http://172.20.10.6:8080';
const vm = 'http://185.241.192.216:8080';
const apiV1 = '/api/v1';
const apiURL = apiV1;
const baseURL = localhost;
const registrationURL = baseURL + apiURL + '/registration';
const authenticationURL = baseURL + apiURL + '/login';
const logoutURL = baseURL + apiURL + '/logout';
const isAuthURL = baseURL + apiURL + '/isAuth';
const cardsURL = baseURL + apiURL + '/cards';
const profileURL = baseURL + apiURL +'/profile';
const imageURL = baseURL + apiURL + '/addImage';
const removeImageURL = baseURL + apiURL + '/deleteImage';
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
        this.profileURL = profileURL;
        this.imageURL = imageURL;
        this.removeImageURL = removeImageURL;
        this.authStatus = null;
        this.CSRFToken = null;
    }
    /**
     * Sends request to specified url with specified data via specified method.
     * @function
     * @param {string} url - request url
     * @param {Object} data - request data
     * @param {string} method - request method
     * @returns {Promise<Object>} - returns request response
     */
    async sendRequest(url = this.baseURL, data = null, method='GET', file=false) {
        const request = {
            method: method,
            credentials: 'include',
        };
        if (this.CSRFToken) {
            request['headers']['csrft'] = this.CSRFToken;
        }
        if (method === 'POST') {
            if (!file)
            request['body'] = JSON.stringify(data);
            else request['body'] = data;
        }
        const response = await fetch(url, request);
        const CSRFToken = response.headers['csrft'];
        if (CSRFToken) {
            this.CSRFToken = CSRFToken;
        }
        if (!response.ok) {
            if (response.status === 401) {
                this.authStatus = false;
            }
        } else if (response.ok) {
            if (!(url === this.registrationURL && method === 'GET')){
                this.authStatus = true;
            }
            if (url === this.logoutURL) {
                this.authStatus = false;
            }
        }

        return response;
    }
    /**
     * Sends request for registration
     * @function
     * @param {Object} formData - registration form data
     * @returns {Promise<Object>} - returns request result
     */
    async Register(formData) {
        const response = await this.sendRequest(this.registrationURL, formData, 'POST');

        return response.status;
    }
    /**
     * Sends request for login
     * @function
     * @param {Object} formData - login form data
     * @returns {Promise<Object>} - returns request result
     */
    async Login(formData) {
        const response = await this.sendRequest(this.authenticationURL, formData, 'POST');

        return response.status;
    }
    /**
     * Sends request for logout
     * @function
     * @returns {Promise<Object>} - returns request result
     */
    async Logout() {
        router.navigateTo('/');

        return await this.sendRequest(this.logoutURL);
    }
    /**
     * Sends request tp check if user is authorized
     * @function
     * @returns {Promise<Object>} - returns request result
     */
    async CheckAuth() {
        return await this.sendRequest(this.isAuthURL);
    }
    /**
     * Sends request for registration interest choices
     * @function
     * @returns {Promise<Object>} - returns request result
     */
    async GetInterests() {
        const response = await this.sendRequest(this.registrationURL);

        return await response.json();
    }
    /**
     * Возвращает массив карточек с сервера
     * @returns {Promise<Array>} - массив карточек
     */
    async GetCards() {
        const response = await this.sendRequest(this.cardsURL);

        return await response.json();
    }
    async GetProfile(userId=null) {
        let url = this.profileURL;
        if (userId) {
            url += `?id=${userId}`;
        }
        const response = await this.sendRequest(url);

        return await response.json();
    }
    async UpdateProfile(formData) {
        const response = await this.sendRequest(this.profileURL, formData, 'POST');

        return await response.status;
    }
    async DeleteProfile() {
        const response = await this.sendRequest(this.profileURL, null, 'DELETE');
        if (response.ok) {
            this.authStatus = false;
        }

        return await response.status;
    }
    async UploadImage(formData) {
        const response = await this.sendRequest(this.imageURL, formData, 'POST', true);

        return await response;
    }
    async DeleteImage(formData) {
        const response = await this.sendRequest(this.removeImageURL, formData, 'POST');

        return await response.status;
    }
}

const apiHandler = new APIHandler();
export default apiHandler;
