import { sendRequest } from "../../../shared/api";
import { Session } from "./types";

export const login = async (email: string, password: string): Promise<Session> => {
    return await sendRequest<Session>("POST", "/login", { email, password });
};

export const logout = async (): Promise<void> => {
    await sendRequest("POST", "/logout");
};
