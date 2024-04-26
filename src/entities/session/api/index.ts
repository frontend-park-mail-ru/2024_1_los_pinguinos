import { sendRequest } from "../../../shared/api";
import { SessionResponse } from "./types";

export const login = async (email: string, password: string): Promise<SessionResponse> => {
    return sendRequest('/login', 'POST', { email, password });
}

export const register = async (email: string, password: string, name: string, age: number, interests: string[]): Promise<SessionResponse> => {
    return sendRequest('/register', 'POST', { email, name, age, interests, password });
}

export const logout = async () => {
    return sendRequest('/logout', 'POST');
};