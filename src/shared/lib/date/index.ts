/**
 * Возвращает возраст по дате рождения
 * @param {string} dateString - дата рождения в формате 'YYYY-MM-DD'
 * @returns {number} - возраст
 */
export const getAge = (dateString: string): number => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

/**
 * Возвращает время, прошедшее с момента отправки сообщения
 * @param {number} timestamp - метка времени
 * @returns {string} - время, прошедшее с момента отправки сообщения
 */
export function timeAgo(timestamp: number) {
    if (timestamp < 0) return '';
    const now = Math.floor(Date.now() / 1000); // текущая метка времени в секундах
    const secondsAgo = Math.floor((now - timestamp / 1000) / 60); // разница в минутах
    if (secondsAgo < 1) {
        return 'только что';
    }
    if (secondsAgo < 60) {
        return `${secondsAgo} минут назад`;
    } else if (secondsAgo < 1440) {
        // если меньше одного дня
        const hoursAgo = Math.floor(secondsAgo / 60);

        return `${hoursAgo} часов назад`;
    } else {
        // если больше одного дня
        const daysAgo = Math.floor(secondsAgo / 1440);

        return `${daysAgo} дней назад`;
    }
}

export function formatUnixTimestamp(unixTimestamp: number) {
    const date = new Date(unixTimestamp * 1000);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
}
