const cardsURL = 'http://185.241.192.216:8080'

export const getCards = async (lastCardId = 0) => {
    const response = await fetch(`${cardsURL}?from=${lastCardId}`);
    const cards = await response.json();
    return cards;
}