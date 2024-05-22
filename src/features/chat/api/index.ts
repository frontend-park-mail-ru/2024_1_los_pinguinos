import { sendRequest } from "../../../shared/api";
import { API_URL } from "../../../shared/config";


/**
 * Возвращает список чатов
 * @returns {Promise<any>} - список чатов
 */
export const getChats = async () => {
    return await sendRequest(API_URL, '/getAllChats', 'GET');
};

/**
 * Возвращает список сообщений с конкретным человеком
 * @param {number} person - id чата
 * @returns {Promise<any>} - список сообщений
 */
export const getMessages = async (person: number) => {
    return await sendRequest(API_URL, `/getChat`, 'POST', { person: person });
}
