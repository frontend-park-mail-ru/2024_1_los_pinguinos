const registrationURL = 'http://185.241.192.216:8080/registration'
const authenticationURL = 'http://185.241.192.216:8080/login'

class AuthHandler {

    async postData(url, data, method='GET') {
        try {
            const response = await fetch(url, {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was greater than 200');
            }
            const jsonData = await response.json();

            return jsonData;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }

    async Register(formData) {
        const result = await this.postData(registrationURL, formData, 'POST');
        return result;
    }

    async Login(formData) {
        const result = await this.postData(authenticationURL, formData, 'POST');
        return result;
    }

    async Logout() {
        return;
    }
}

export default AuthHandler;
