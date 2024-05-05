import { sendRequest } from "../../../shared/api";
import { API_URL } from "../../../shared/config";

export const like = async (id: string) => {
    return sendRequest(API_URL, '/like', 'POST', { id });
}

export const dislike = async (id: string) => {
    return sendRequest(API_URL, '/dislike', 'POST', { id });
}