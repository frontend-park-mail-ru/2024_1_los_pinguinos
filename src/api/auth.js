import router from "../../index.js";

class AuthHandler {

    constructor() {
        this.localhost = 'http://192.168.50.168:8080';
        this.vm = 'http://185.241.192.216:8080';
        this.baseURL = this.localhost;
        this.registrationURL = this.baseURL + '/registration';
        this.authenticationURL =this.baseURL + '/login';
        this.logoutURL = this.baseURL + '/logout';
        this.isAuthURL = this.baseURL + '/isAuth';
    }

    async sendRequest(url = this.baseURL, data = {}, method='GET') {
        try {
            let response;
            if (method == 'GET') {
                response = await fetch(url, {
                    method: method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            } else if (method == 'POST') {
                response = await fetch(url, {
                    method: method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            if (!response.ok) {
                localStorage.setItem('sid', false);
                if (url !== this.authenticationURL && url !== this.registrationURL) {
                    router.navigateTo('/login');
                }
                throw new Error('Network response was not sucessfull');
            }
            localStorage.setItem('sid', true);
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
