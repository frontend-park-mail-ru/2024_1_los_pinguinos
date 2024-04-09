import apiHandler from '../../api/apiHandler';
import componentHandler from '../../components/basic/ComponentHandler';

class User {
    constructor() {
        this.userData = null;
    }
    async Load(userId=null) {
        const rawProfileData = await apiHandler.GetProfile(userId);
        const profileData = JSON.parse(rawProfileData);
        this.userData = profileData[0]['person'];
        this.userData['interests'] = profileData[0]['interests'];
    }
    Email() {
        return this.userData['email'].replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2');
    }
    Name() {
        return this.userData['name'];
    }
    Description() {
        return this.userData['description'];
    }
    DisplayPictures() {
        let photoURLS = this.userData['photos'];
        const acceptedFileTypes = ['image/png', 'image/jpeg', 'image.jpg'];
        if (!photoURLS) {
            photoURLS = [null, null, null, null, null];
        }
        const photos = Array.from(photoURLS, (pfpUrl, idx) => {
            const btnClasses = [
                'form__button--create',
                'form__button--disabled',
                'form__button--inactive',
                'form__button--remove',
            ];
            const itemClasses = ['grid__item--first', 'grid__item--other'];
            const actionButton = componentHandler.generateComponentContext(
                'btn', pfpUrl ? btnClasses.slice(-1) : photoURLS[idx - 1] || idx === 0 ? btnClasses.slice(0,1) : btnClasses.slice(0, -1), {file: 1, acceptedFileTypes: acceptedFileTypes},
            );
            const pictureItem = componentHandler.generateComponentContext(
                'photo', idx === 0 ? itemClasses.slice(0,1) : itemClasses.slice(-1), {actionButton: actionButton},
            );
            if (pfpUrl) {
                pictureItem['pictureURL'] = pfpUrl;
            }

            return pictureItem;
        });

        return photos;
    }
    DisplayInterests() {
        if (this.userData['interests']) {
            const interests = this.userData['interests'];
            const resultingInterests = Array.from(interests, (interest) => {
                return componentHandler.generateComponentContext('interest', ['form__button--checkbox', 'form__button--inactive'], {
                    buttonText: interest['Name'],
                });
            });

            return resultingInterests;
        }

        return [];
    }
    Update(data) {
        for (const key in data) {
            this.userData[key] = data[key];
        }
    }

}

export default User;
