import { sendRequest } from "../../../shared/api";
import { SessionResponse } from "./types";

export const login = async (email: string, password: string): Promise<SessionResponse> => {
    return sendRequest('/api/login', 'POST', { email, password });
}

export const logout = async () => {
    return sendRequest('/api/logout', 'POST');
};