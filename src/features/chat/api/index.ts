import { sendRequest } from "../../../shared/api";
import { API_URL } from "../../../shared/config";

export const getMessages = async (chatId: string) => {
    return sendRequest(API_URL, `/getChat`, 'GET', { Person: chatId });
};