const cardsURL = 'http://185.241.192.216:8080';

// export const getCards = async (lastCardId = 0) => {
//     const response = await fetch(`${cardsURL}/?last=${lastCardId}`);
//     const cards = await response.json();
//     console.log(response);
//     return cards;
// }

export const getCards = async (last = 0) => {
  try {
    const response = await fetch(cardsURL + `?last=${last}`, {
      method: 'GET',
      credentials: 'include',
      body: JSON.stringify({
        last: last,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status > 200) {
      console.log(response.status);
      throw new Error('Network response was greater than 200');
    }
    const jsonData = await response.json();
    console.log(response.status);
    console.log(jsonData);

return [jsonData, response.status == 200];
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    console.log(response.status);

return [null, false];
  }
};
