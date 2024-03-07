const cardsURL = 'http://185.241.192.216:8080/cards';

import AuthHandler from "./auth";
// export const getCards = async (lastCardId = 0) => {
//     const response = await fetch(`${cardsURL}/?last=${lastCardId}`);
//     const cards = await response.json();
//     console.log(response);
//     return cards;
// }

// export const getCards = async () => {
//     console.log("im in cards");
//     let response;
//     try {
//         response = await fetch(cardsURL + '/', {
//             method: 'GET',
//             credentials: 'include',
//             //   body: JSON.stringify({
//             //     last: last,
//             //   }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.status > 200) {
//             console.log(response);
//             throw new Error('Network response was greater than 200');
//         }
//         const jsonData = await response.json();
//         console.log(response.status);
//         console.log(jsonData);

//         return jsonData;
//     } catch (error) {
//         console.error('There was a problem with your fetch operation:', error);
//         console.log(response);
//         return [null, false];
//     }
// };

const cardHandler = new AuthHandler();

export const getCards = cardHandler.sendRequest(cardsURL).then((response) => {
    console.log(response);
    return response;
}).catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    return undefined;
})