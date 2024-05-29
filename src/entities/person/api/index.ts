import { sendRequest } from '../../../shared/api/index';
import { PersonDTO } from './types';
import { Person } from '../model/index';
import { normalizePerson } from '../lib/normalizePerson';
import { AUTH_URL, API_URL } from '../../../shared/config/index';

/**
 * Получает карточки
 * @returns { Promise<Person[]> } - Возвращает массив карточек
 * @throws { Error } - Возвращает ошибку, если запрос не удался
 */
export const getCards = async (): Promise<Person[]> => {
    const cards = await sendRequest<{
        cards: PersonDTO[];
    }>(API_URL, '/cards', 'GET');
    return cards.cards.map(normalizePerson);
};

/**
 * Получает мэтчи
 * @param { string } name - Имя пользователей для поиска
 * @returns { Promise<Person[]> } - Возвращает массив пользователей
 */
export const getMatches = async (name: string): Promise<Person[]> => {
    const matches = await sendRequest<{
        matches: PersonDTO[];
    }>(AUTH_URL, `/matches`, 'POST', { name: name });
    return matches.matches.map(normalizePerson);
};

/**
 * Получает информацию о пользователе
 * @returns { Promise<Person> } - Возвращает информацию о пользователе
 */
export const getProfile = async (): Promise<Person> => {
    const profile = await sendRequest<PersonDTO>(AUTH_URL, `/profile`, 'GET');
    return normalizePerson(profile);
};
