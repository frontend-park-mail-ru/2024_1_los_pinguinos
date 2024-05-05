import { sendRequest } from "../../../shared/api";
import { API_URL } from "../../../shared/config";

export const getChats = async () => {
    return await sendRequest(API_URL, '/getAllChats', 'GET');
};

export const getMessages = async (person: number) => {
    return await sendRequest(API_URL, `/getChat`, 'POST', { person: person });
}
