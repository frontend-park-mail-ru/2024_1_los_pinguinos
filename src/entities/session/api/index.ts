import { sendRequest } from '../../../shared/api/index';
import { SessionResponse } from './types';
import { Interest } from '../../person/model';
import { Person } from '../../person/model';
import { AUTH_URL, API_URL } from '../../../shared/config/index';

export const login = async (
    email: string,
    password: string,
): Promise<SessionResponse> => {
    return sendRequest(AUTH_URL,'/login', 'POST', { email, password });
};

export const register = async (
    email: string,
    password: string,
    name: string,
    gender: string,
    birthday: string,
    interests: string[],
): Promise<SessionResponse> => {
    return sendRequest(AUTH_URL ,'/register', 'POST', {
        email,
        password,
        name,
        gender,
        birthday,
        interests,
    });
};

export const logout = async () => {
    return sendRequest( AUTH_URL,'/logout', 'POST');
};

export const updateName = async (name: string) => {
    return sendRequest(API_URL, '/profile', 'POST', { name });
};

export const updateDescription = async (description: string) => {
    return sendRequest(API_URL, '/profile', 'POST', { description });
};

export const updateInterests = async (interests: Interest[]) => {
    return sendRequest(API_URL, '/profile', 'POST', { interests });
};

export const updateEmail = async (email: string) => {
    return sendRequest(API_URL, '/profile', 'POST', { email });
};

export const updatePassword = async (password: string) => {
    return sendRequest(API_URL, '/profile', 'POST', { password });
};

export const checkAuth = async () => {
    return sendRequest(API_URL, '/isAuth', 'GET');
};
