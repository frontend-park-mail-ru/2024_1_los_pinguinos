import router from '../../index.js';

const localhost = 'http://192.168.50.168:8080';
const vm = 'http://185.241.192.216:8080';
const baseURL = localhost;
const registrationURL = baseURL + '/registration';
const authenticationURL = baseURL + '/login';
const logoutURL = baseURL + '/logout';
const isAuthURL = baseURL + '/isAuth';
const cardsURL = baseURL + '/cards';

class AuthHandler {

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

    async Register(formData) {
        return await this.sendRequest(this.registrationURL, formData, 'POST');
    }

    async Login(formData) {
        return await this.sendRequest(this.authenticationURL, formData, 'POST');
    }

    async Logout() {
        router.navigateTo('/');

        return await this.sendRequest(this.logoutURL);
    }
}

const authHandler = new AuthHandler();
export default authHandler;
