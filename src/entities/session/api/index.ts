import { sendRequest } from '../../../shared/api/index';
import { SessionResponse } from './types';
import { Interest } from '../../person/model/index';
import { Person } from '../../person/model/index';
import { AUTH_URL, API_URL } from '../../../shared/config/index';

export const login = async (
    email: string,
    password: string,
): Promise<SessionResponse> => {
    return sendRequest(AUTH_URL, '/login', 'POST', { email, password });
};

export const register = async (
    email: string,
    password: string,
    name: string,
    gender: string,
    birthday: string,
    interests: string[],
): Promise<SessionResponse> => {
    return sendRequest(AUTH_URL, '/registration', 'POST', {
        email,
        password,
        name,
        gender,
        birthday,
        interests,
    });
};

export const logout = async () => {
    return sendRequest(AUTH_URL, '/logout', 'POST');
};

export const updateName = async (name: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { name });
};

export const updateDescription = async (description: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { description });
};

export const updateInterests = async (interests: Interest[]) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { interests });
};

export const updateEmail = async (email: string, oldPassword: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { email, oldPassword });
};

export const updatePassword = async (password: string, oldPassword: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { password, oldPassword });
};

export const checkAuth = async () => {
    return sendRequest(AUTH_URL, '/isAuth', 'GET');
};
