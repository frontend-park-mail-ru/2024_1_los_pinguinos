import { sendRequest } from "../../../shared/api";
import { API_URL } from "../../../shared/config";

/**
 * Отправляет запрос на лайк на сервер
 * @param {string} id - id пользователя
 * @returns {Promise<any>} - ответ от сервера
 */
export const like = async (id: string) => {
    return sendRequest(API_URL, '/like', 'POST', { id });
}

/**
 * Отправляет запрос на дизлайк на сервер
 * @param {string} id - id пользователя
 * @returns {Promise<any>} - ответ от сервера
 */
export const dislike = async (id: string) => {
    return sendRequest(API_URL, '/dislike', 'POST', { id });
}