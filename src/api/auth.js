const localhost = 'http://127.0.0.1:8080';
const vm = 'http://185.241.192.216:8080';
const baseURL = vm;
const registrationURL = baseURL + '/registration';
const authenticationURL = baseURL + '/login';
const logoutURL = baseURL + '/logout';
const isAuthURL = baseURL + '/isAuth';

class AuthHandler {

    async sendRequest(url = baseURL, data = {}, method='GET') {
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
                console.log('err: ', response.status);
                throw new Error('Network response was not sucessfull');
            }
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            return undefined;
        }
    }

    async Register(formData) {
        return await this.sendRequest(registrationURL, formData, 'POST');
    }

    async Login(formData) {
        return await this.sendRequest(authenticationURL, formData, 'POST');
    }

    async Logout() {
        return await this.sendRequest(logoutURL, '', 'GET');
    }

    async isAuthenticated() {
        return await this.sendRequest(isAuthURL);
    }
}

export default AuthHandler;
