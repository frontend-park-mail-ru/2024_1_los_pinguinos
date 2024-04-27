import { sendRequest } from "../../../shared/api";

export const uploadImage = async (file: File, cell: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('cell', cell);
    return sendRequest('POST', '/upload', formData);
}

export const deleteImage = async (cell: string) => {
    return sendRequest('POST', '/deleteImage', { cell });
}