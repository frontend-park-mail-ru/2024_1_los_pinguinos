const cardsURL = 'http://192.168.50.168:8080/cards';

import authHandler from './auth';

const cardHandler = authHandler;

export const getCards = cardHandler.sendRequest(cardsURL).then((response) => {
    return response;
}).catch(error => {
    console.error('There was a problem with your fetch operation:', error);

    return undefined;
});
