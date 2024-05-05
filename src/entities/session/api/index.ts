import { sendRequest } from '../../../shared/api/index';
import { SessionResponse } from './types';
import { Interest } from '../../person/model';
import { Person } from '../../person/model';

export const login = async (
    email: string,
    password: string,
): Promise<SessionResponse> => {
    return sendRequest('/login', 'POST', { email, password });
};

export const register = async (
    email: string,
    password: string,
    name: string,
    gender: string,
    birthday: string,
    interests: string[],
): Promise<SessionResponse> => {
    console.log(email, password, gender, name, birthday, interests);
    return sendRequest('/registration', 'POST', {
        email,
        password,
        name,
        gender,
        birthday,
        interests,
    });
};

export const logout = async () => {
    return sendRequest('/logout', 'POST');
};

export const updateName = async (name: string) => {
    return sendRequest('/profile', 'POST', { name });
};

export const updateDescription = async (description: string) => {
    return sendRequest('/profile', 'POST', { description });
};

export const updateInterests = async (interests: Interest[]) => {
    return sendRequest('/profile', 'POST', { interests });
};

export const updateEmail = async (email: string) => {
    return sendRequest('/profile', 'POST', { email });
};

export const updatePassword = async (password: string) => {
    return sendRequest('/profile', 'POST', { password });
};

export const checkAuth = async () => {
    return sendRequest('/isAuth', 'GET');
};
