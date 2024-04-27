import { sendRequest } from "../../../shared/api";

export const like = async (id: string) => {
    return sendRequest('POST', '/like', { id });
}

export const dislike = async (id: string) => {
    return sendRequest('POST', '/dislike', { id });
}