import apiHandler from '../../api/apiHandler';
import componentHandler from './ComponentHandler';

let rawAppInterests = null;
let appInterests = null;

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
export {getInterests};
export {rawAppInterests};
export {appInterests};

