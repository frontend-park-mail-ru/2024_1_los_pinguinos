import apiHandler from '../../api/apiHandler';
import componentHandler from '../../components/basic/ComponentHandler';
import storage from '../storage/storage';

function containsKeyValuePair(array, key, value) {
    return array.some(obj => obj[key] === value);
  }

class User {
    constructor() {
        this.userData = null;
    }
    async Load(userId=null) {
        const rawProfileData = await apiHandler.GetProfile(userId);
        const profileData = JSON.parse(rawProfileData);
        this.userData = profileData[0]['person'];
        this.userData['interests'] = profileData[0]['interests'];
        this.userData['photos'] = profileData[0]['photo'];
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
    UpdatePicture(id, value) {
        this.userData['photos'][id]['url'] = value;
    }
    DisplayPictures() {
        let photoObjects = this.userData['photos'];
        if (!photoObjects) {
            photoObjects = [];
            this.userData['photos'] = photoObjects;
        }
        if (photoObjects.length < 5) {
            for (let i = 0; i < 5; i++) {
                if (!containsKeyValuePair(photoObjects, 'cell', `${i}`)) {
                    photoObjects.splice(i, 0, {'cell': `${i}`, 'url': null});
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            photoObjects[i]['cell'] = +photoObjects[i]['cell'];
        }
        photoObjects.sort(function(a, b) {
            if (a['cell'] < b['cell']) {
                return -1;
            } else if (a['cell'] > b['cell']) {
                return 1;
            } else {
                return 0;
            }
        });
        this.userData['photos'] = photoObjects;
        let flag = true;
        const photos = Array.from(photoObjects, (photoObject, idx) => {
            const btnClasses = [
                'form__button--create',
                'form__button--disabled',
                'form__button--inactive',
                'form__button--remove',
            ];
            const pictureURL = photoObject['url'];
            const itemClasses = ['grid__item--first', 'grid__item--other'];
            const acceptedFileTypes = ['image/png', 'image/jpeg', 'image.jpg'];
            const actionButton = componentHandler.generateComponentContext(
                'btn', pictureURL ? btnClasses.slice(-1) : idx === 0 || photoObjects[idx - 1]['url'] && flag ? btnClasses.slice(0,1) : btnClasses.slice(0, -1), {file: 1, acceptedFileTypes: acceptedFileTypes},
            );
            if (actionButton['classes'].includes('form__button--create')) {
                flag = false;
            }
            const pictureItem = componentHandler.generateComponentContext(
                'photo', idx === 0 ? itemClasses.slice(0,1) : itemClasses.slice(-1), {actionButton: actionButton},
            );
            if (pictureURL) {
                pictureItem['pictureURL'] = pictureURL;
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
        if ('interests' in data) {
            this.userData['interests'] = new Array();
            for (const interest of storage.rawAppInterests) {
                if (data['interests'].includes(interest))
                this.userData['interests'].push({'Name': interest});
            }
        }
        for (const key in data) {
            if (key !== 'interests')
            this.userData[key] = data[key];
        }
    }

}

export default User;
