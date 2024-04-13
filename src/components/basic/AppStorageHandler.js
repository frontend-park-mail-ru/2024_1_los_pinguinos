import apiHandler from '../../api/apiHandler.js';
import componentHandler from './ComponentHandler.js';
import User from '../../models/user/User.js';
import storage from '../../models/storage/storage.js';

class AppStorageHandler {
    constructor() {
        storage.appInterests = null;
        storage.rawAppInterests = null;
        this.getInterests();
        storage.user = null;
    }
    async getInterests() {
        const interestsRaw = await apiHandler.GetInterests();
        const interests = JSON.parse(interestsRaw);
        storage.rawAppInterests = Array.from(interests, (interest) => {return interest['Name'];});
        if (interests) {
            storage.appInterests = Array.from(interests, (interest) => {
                return componentHandler.generateComponentContext('interest', ['form__button--checkbox'], {buttonText: interest['Name']});
            });
        } else {
            storage.appInterests = [];
        }
    }
    async GetUser() {
        if (!storage.user) {
            const user = new User();
            await user.Load();
            storage.user = user;
        }
    }
}

const appStorageHandler = new AppStorageHandler();

export default appStorageHandler;
