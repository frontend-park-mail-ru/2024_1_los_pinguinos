import { sendRequest } from '../../../shared/api/index';
import { SessionResponse } from './types';
import { Interest } from '../../person/model/index';
import { AUTH_URL, API_URL } from '../../../shared/config/index';

/**
 * Авторизация пользователя
 * @param { string } email - Почта пользователя
 * @param { string } password - Пароль пользователя
 * @returns { Promise<SessionResponse> } - Возвращает ответ сервера c данными пользователя и токеном
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const login = async (
    email: string,
    password: string,
): Promise<SessionResponse> => {
    return sendRequest(AUTH_URL, '/login', 'POST', { email, password });
};

/**
 * Регистрация пользователя
 * @param { string } email - Почта пользователя
 * @param { string } password - Пароль пользователя
 * @param { string } name - Имя пользователя
 * @param { string } gender - Пол пользователя
 * @param { string } birthday - Дата рождения пользователя
 * @param { string[] } interests - Интересы пользователя
 * @returns { Promise<SessionResponse> } - Возвращает ответ сервера c данными пользователя и токеном
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
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

/**
 * Выход пользователя из системы
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const logout = async () => {
    return sendRequest(AUTH_URL, '/logout', 'GET');
};

/**
 * Удаление профиля пользователя
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const deleteProfile = async () => {
    return sendRequest(AUTH_URL, '/profile', 'DELETE');
};

/**
 * Обновление имя пользователя
 * @param { string } name - Имя пользователя
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const updateName = async (name: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { name });
};

/**
 * Обновдление описания пользователя
 * @param { string } description - Описание пользователя
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const updateDescription = async (description: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { description });
};

/**
 * Обновление интересов пользователя
 * @param { (string | Interest)[] } interests - Интересы пользователя
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const updateInterests = async (interests: (string | Interest)[]) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { interests });
};

/**
 * Обновление почты пользователя
 * @param { string } email - Почта пользователя
 * @param { string } oldPassword - Старый пароль пользователя
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const updateEmail = async (email: string, oldPassword: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { email, oldPassword });
};

/**
 * Обновление пароля пользователя
 * @param { string } password - Пароль пользователя
 * @param { string } oldPassword - Старый пароль пользователя
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const updatePassword = async (password: string, oldPassword: string) => {
    return sendRequest(AUTH_URL, '/profile', 'POST', { password, oldPassword });
};

/**
 * Проверка авторизации пользователя
 * @returns { Promise<void> } - Ничего не возвращает
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const checkAuth = async () => {
    return sendRequest(AUTH_URL, '/isAuth', 'GET');
};

/**
 * Получение интересов пользователя
 * @returns { Promise<string[]> } - Возвращает массив интересов пользователя
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const getInterests = async () => {
    return sendRequest(AUTH_URL, '/registration', 'GET');
};
