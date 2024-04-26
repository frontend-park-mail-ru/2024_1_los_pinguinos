export function getAuthorizationToken() {
    const csrfToken = localStorage.getItem('csrfToken');
    return csrfToken;
}

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
* Validates input according to predefined regex parameters.
* @function
* @param {string} type - input type
* @param {string} input - the input itself
* @returns {boolean} - regex validation result
*/
export const validateInput = (type: string, input: string): boolean => {
    const expressions = {
        password: /^.{8,32}$/,
        email: /^(?=.{1,320}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        text: /^(?=.{2,32}$)[\p{L}]+$/u,
        emoji: /^[\x20-\x7E]+$/,
    };
    const regexExpression = expressions[type];
    const regexEmoji = expressions['emoji'];
    if (type === 'text') {
        return regexExpression.test(input);
    }
    if (type === 'date') {
        const timeStamp = Date.parse(input) / 1000;

        return 0 <= timeStamp && timeStamp < 1230757200;
    }

    return regexExpression.test(input) && regexEmoji.test(input);
}