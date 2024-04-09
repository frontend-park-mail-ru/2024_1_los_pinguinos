import apiHandler from '../../api/apiHandler.js';
import componentHandler from './ComponentHandler.js';
import User from '../../models/user/User.js';

class AppStorageHandler {
    constructor() {
        this.appInterests = null;
        this.getInterests();
        this.user = null;
    }
    async getInterests() {
        const interests = await apiHandler.GetInterests();
        if (interests) {
            this.appInterests = Array.from(JSON.parse(interests), (interest) => {
                return componentHandler.generateComponentContext('interest', ['form__button--checkbox'], {buttonText: interest['Name']});
            });
        } else {
            this.appInterests = [];
        }
    }
    async GetUser() {
        if (!this.user) {
            const user = new User();
            await user.Load();
            this.user = user;
        }
    }
}

const appStorageHandler = new AppStorageHandler();

export default appStorageHandler;
