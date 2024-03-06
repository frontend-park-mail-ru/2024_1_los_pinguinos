const localhost = 'http://127.0.0.1:8080';
const vm = 'http://185.241.192.216:8080';
const baseURL = vm;
const registrationURL = baseURL + '/registration';
const authenticationURL = baseURL + '/login';
const logoutURL = baseURL + '/logout';

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
            if (response.status > 200) {
                console.log(response.status);
                throw new Error('Network response was greater than 200');
            }
            const jsonData = await response.json();
            console.log(response.status);
            return [jsonData, response.status == 200];
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            console.log(response.status);
            return [null, false];
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
        const result = await this.sendRequest();
        return result[1];
    }
}

export default AuthHandler;
