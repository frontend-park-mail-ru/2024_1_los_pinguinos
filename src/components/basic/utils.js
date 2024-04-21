import apiHandler from '../../api/apiHandler';
import componentHandler from './ComponentHandler';

let rawAppInterests = null;
let appInterests = null;
/**
 * Update app header flux (later will become an event handler)
 * @function
 * @param {Object} newState - redux state
 */
function updateHeader(newState) {
  if (newState) {
    const header = document.querySelector('.header__menu');
        if (header) {
            const pfp = header.querySelector('.header__pfp');
            const name = header.querySelector('.header__paragraph');
            let src = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
            if (pfp) {
                if (newState.photos) {
                  for (const photo of newState.photos) {
                      if (photo.url) {
                          src = photo.url;
                          break;
                      }
                  }
                }
                pfp.src = src;
            }
            if (name) {
                name.innerText = newState.name;
            }
        }
  }
}
/**
 * Subscribe header for state updates (will become an event handler)
 * @function
 * @param {Object} store - redux store
 */
function subscribeHeader(store) {
  store.subscribe(newState => {
      updateHeader(newState);
  });
}
/**
 * Load header changes from store (later will become an event handler)
 * @function
 * @param {Object} store - redux store
 */
function loadHeader(store) {
  const newState = store.getState();
  updateHeader(newState);
}
/**
 * Update app background depending on path
 * @function
 * @param {string} path - app path
 */
function handleBackground(path) {
    const body = document.body;
    let url = path.slice(1,path.length);
    if (path=== '/') {
      url = 'landing';
    }
    if (!url) {
      url = '404';
    }
    if (url !== 'main' && url !== 'profile' && url !== 'matches') {
      body.style.backgroundSize = 'cover';
    }
    body.style.backgroundImage = `var(--background--${url})`;
}
/**
 * Returns interes context for UI composure
 * @function
 */
async function getInterests() {
  let interests;
  if (rawAppInterests) {
    interests = rawAppInterests;
  } else {
    interests = await apiHandler.GetInterests();
    if (!(interests && interests.ok)) return [];
    interests = await interests.json();
    rawAppInterests = interests;
    appInterests = Array.from(interests, (interest) => {return interest.name;});
  }
  if (interests) {
      interests = Array.from(interests, (interest) => {
          return componentHandler.generateComponentContext('interest', ['form__button--checkbox'], {buttonText: interest.name});
      });
  } else {
      return [];
  }
  console.log("INTERESTS OK", rawAppInterests);
  return interests;
}

export {handleBackground};
export {subscribeHeader};
export {loadHeader};
export {getInterests};
export {rawAppInterests};
export {appInterests};

