import { PersonDTO } from '../api/types';
import { Person } from '../model';

/**
 * Нормализует данные пользователя c сервера
 * @param { PersonDTO } person - Данные пользователя с сервера
 * @returns { Person } - Нормализованные данные пользователя
 */
export const normalizePerson = (person: PersonDTO): Person => ({
    id: person.id,
    email: person.email,
    name: person.name,
    birthday: person.birthday,
    description: person.description,
    interests: person.interests,
    photos: person.photos.map((photo) => ({
        cell: photo.cell,
        url: photo.url,
    })),
});
