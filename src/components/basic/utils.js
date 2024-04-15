import apiHandler from '../../api/apiHandler';
import componentHandler from './ComponentHandler';

let rawAppInterests = null;
let appInterests = null;

function subscribeHeader(store) {
  store.subscribe(newState => {
      const header = document.querySelector('.header__menu');
      if (header) {
          const pfp = header.querySelector('.header__pfp');
          const name = header.querySelector('.header__paragraph');
          let src = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
          if (pfp) {
              for (const photo of newState.photos) {
                  if (photo.url) {
                      src = photo.url;
                      break;
                  }
              }
              pfp.src = src;
          }
          if (name) {
              name.innerText = newState.name;
          }
      }
  });
}

function loadHeader(store) {
  const newState = store.getState();
  const header = document.querySelector('.header__menu');
  if (header) {
      const pfp = header.querySelector('.header__pfp');
      const name = header.querySelector('.header__paragraph');
      if (pfp) {
          for (const photo of newState.photos) {
              if (photo.url) {
                  pfp.src = photo.url;
                  break;
              }
          }
      }
      if (name) {
          name.innerText = newState.name;
      }
  }
}

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

async function getInterests() {
  let interests;
  if (rawAppInterests) {
    interests = rawAppInterests;
  } else {
    interests = await apiHandler.GetInterests();
    interests = await interests.json();
    rawAppInterests = interests;
    appInterests = Array.from(interests, (interest) => {return interest.name;});
  }
  if (!interests) {
      return [];
  }
  if (interests) {
      interests = Array.from(interests, (interest) => {
          return componentHandler.generateComponentContext('interest', ['form__button--checkbox'], {buttonText: interest.name});
      });
  } else {
      return [];
  }

  return interests;
}

export {handleBackground};
export {subscribeHeader};
export {loadHeader};
export {getInterests};
export {rawAppInterests};
export {appInterests};

