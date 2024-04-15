import componentHandler from '../../components/basic/ComponentHandler';
/**
 * Check whether key value pair is in array
 * @function
 * @param {Object[]} array - array of key value pairs
 * @param {string} key - a key
 * @param {any} value - a value
 */
function containsKeyValuePair(array, key, value) {
    return array.some(obj => obj[key] === value);
}
/**
 * User utility class
 * @class
 */
class userUtility {
    /**
     * Returns formatted email
     * @function
     */
    formattedEmail(email) {
        return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2');
    }
    /**
     * Returns pictures in displayable state for profile
     * @function
     */
    DisplayPictures(pictures) {
        let photoObjects = pictures;
        if (!photoObjects) {
            photoObjects = [];
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
    /**
     * Returns interests in displayable state for profile
     * @function
     */
    DisplayInterests(interests) {
        if (interests) {
            const resultingInterests = Array.from(interests, (interest) => {
                return componentHandler.generateComponentContext('interest', ['form__button--checkbox', 'form__button--inactive'], {
                    buttonText: interest.name,
                });
            });

            return resultingInterests;
        }

        return [];
    }
}

export default new userUtility();
