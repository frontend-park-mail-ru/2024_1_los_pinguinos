import { sendRequest } from '../../../shared/api';
import { PICTURE_URL } from '../../../shared/config';

/**
 * Загрузка изображения
 * @param { File } file - Файл
 * @param { string } cell - Ячейка
 * @returns { Promise } - Промис с результатом запроса
 */
export const uploadImage = async (file: File, cell: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('cell', cell);
    return sendRequest(PICTURE_URL, '/addImage', 'POST', formData, true);
};

/**
 * Удаление изображения
 * @param { string } cell - Ячейка
 * @returns { Promise } - Промис с результатом запроса
 */
export const deleteImage = async (cell: string) => {
    return sendRequest(PICTURE_URL, '/deleteImage', 'POST', { cell });
};
