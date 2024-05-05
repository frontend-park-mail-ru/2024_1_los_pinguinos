import { sendRequest } from '../../../shared/api';
import { PICTURE_URL } from '../../../shared/config';

export const uploadImage = async (file: File, cell: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('cell', cell);
    return sendRequest(PICTURE_URL, '/addImage', 'POST', formData, true);
};

export const deleteImage = async (cell: string) => {
    return sendRequest(PICTURE_URL, '/deleteImage', 'POST', { cell });
};
