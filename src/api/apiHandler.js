import router from '../../index.js';
import { store } from '../../index.js';

const localhost = 'http://127.0.0.1:8080';
const vm = 'https://api.jimder.ru';
const apiV1 = '/api/v1';
const apiURL = apiV1;
const baseURL = localhost;
const registrationURL = baseURL + apiURL + '/registration';
const authenticationURL = baseURL + apiURL + '/login';
const logoutURL = baseURL + apiURL + '/logout';
const isAuthURL = baseURL + apiURL + '/isAuth';
const cardsURL = baseURL + apiURL + '/cards';
const profileURL = baseURL + apiURL + '/profile';
const imageURL = baseURL + apiURL + '/addImage';
const matchesURL = baseURL + apiURL + '/matches';
const likeURL = baseURL + apiURL + '/like';
const dislikeURL = baseURL + apiURL + '/dislike';
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
        this.matchesURL = matchesURL;
        this.likeURL = likeURL;
        this.dislikeURL = dislikeURL;
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
    async sendRequest(
        url = this.baseURL,
        data = null,
        method = 'GET',
        file = false
    ) {
        try {
            const request = {
                method: method,
                credentials: 'include',
                headers: {
                    Csrft: this.CSRFToken,
                },
            };
            if (method === 'POST') {
                if (!file) request['body'] = JSON.stringify(data);
                else request['body'] = data;
            }
            const response = await fetch(url, request);
            if (!response.ok) {
                if (response.status === 401) {
                    this.authStatus = false;
                }
            } else if (response.ok) {
                if (!(url === this.registrationURL && method === 'GET')) {
                    this.authStatus = true;
                }
                if (url === this.logoutURL) {
                    this.authStatus = false;
                }
            }

            return response;
        } catch (error) {
            return null;
        }
    }
    /**
     * Gets CSRF token from request response
     * @function
     * @param {Promise<Object>} response - response object
     * @returns {Promise<Object>} - returns request response
     */
    async getCSRFToken(response) {
        if (response && response.ok) {
            const CSRFToken = await response.clone().json();
            if (CSRFToken && 'csrft' in CSRFToken) {
                this.CSRFToken = CSRFToken['csrft'];
            }

            return CSRFToken;
        }
    }
    /**
     * Sends request for registration
     * @function
     * @param {Object} formData - registration form data
     * @returns {Promise<Object>} - returns request result
     */
    async Register(formData) {
        const response = await this.sendRequest(
            this.registrationURL,
            formData,
            'POST'
        );
        const data = await this.getCSRFToken(response);
        if (data) {
            store.dispatch({ type: 'UPDATE_USER', payload: data });
        }

        return response;
    }
    /**
     * Sends request for login
     * @function
     * @param {Object} formData - login form data
     * @returns {Promise<Object>} - returns request result
     */
    async Login(formData) {
        const response = await this.sendRequest(
            this.authenticationURL,
            formData,
            'POST'
        );
        if (!response) return;
        const token = await this.getCSRFToken(response);
        store.dispatch({ type: 'UPDATE_USER', payload: token });

        return response;
    }
    /**
     * Sends request for logout
     * @function
     * @returns {Promise<Object>} - returns request result
     */
    async Logout() {
        const response = await this.sendRequest(this.logoutURL);
        if (response && response.ok) {
            this.authStatus = false;
            localStorage.clear();
            router.navigateTo('/');
            store.dispatch({ type: 'LOGOUT' });
        }

        return response;
    }
    /**
     * Sends request tp check if user is authorized
     * @function
     * @returns {Promise<Object>} - returns request result
     */
    async CheckAuth() {
        const response = await this.sendRequest(this.isAuthURL);
        await this.getCSRFToken(response);

        return response;
    }
    /**
     * Sends request for registration interest choices
     * @function
     * @returns {Promise<Object>} - returns request result
     */
    async GetInterests() {
        return await this.sendRequest(this.registrationURL);
    }
    /**
     * Возвращает массив карточек с сервера
     * @returns {Promise<Array>} - массив карточек
     */
    async GetCards() {
        return await this.sendRequest(this.cardsURL);
    }
    /** Gets user matches from server
     * @function
     * @returns {Promise<Object>} - returns request response
     */
    async GetMatches() {
        const response = await this.sendRequest(this.matchesURL);

        return response;
    }
    /** Gets user proifle by id from server
     * @function
     * @param {Number} userId - user id
     * @returns {Promise<Object>} - returns request response
     */
    async GetProfile(userId = null) {
        let url = this.profileURL;
        if (userId) {
            url += `?id=${userId}`;
        }

        return await this.sendRequest(url);
    }
    /** Updates user profile on server
     * @function
     * @param {Object} formData - data to update
     * @returns {Promise<Object>} - returns request response
     */
    async UpdateProfile(formData) {
        return await this.sendRequest(this.profileURL, formData, 'POST');
    }
    /** Deletes user profile
     * @function
     * @returns {Promise<Object>} - returns request response
     */
    async DeleteProfile() {
        const response = await this.sendRequest(
            this.profileURL,
            null,
            'DELETE'
        );
        if (response && response.ok) {
            this.authStatus = false;
        }

        return response;
    }
    /** Uploads an image to server
     * @function
     * @param {Object} formData - multipart form data for file
     * @returns {Promise<Object>} - returns request response
     */
    async UploadImage(formData) {
        return await this.sendRequest(this.imageURL, formData, 'POST', true);
    }
    /** Deletes an image from server
     * @function
     * @param {Object} formData - image removal params
     * @returns {Promise<Object>} - returns request response
     */
    async DeleteImage(formData) {
        return await this.sendRequest(this.removeImageURL, formData, 'POST');
    }
    /** Likes a user
     * @function
     * @param {Number} id - another user's id
     * @returns {Promise<Object>} - returns request response
     */
    async LikeCard(id) {
        return await this.sendRequest(this.likeURL, { id }, 'POST');
    }
    /** Dislikes a user
     * @function
     * @param {Number} id - another user's xid
     * @returns {Promise<Object>} - returns request response
     */
    async DislikeCard(id) {
        return await this.sendRequest(this.dislikeURL, { id }, 'POST');
    }
}

export default new APIHandler();
