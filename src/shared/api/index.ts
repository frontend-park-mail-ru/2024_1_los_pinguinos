import { store } from '../../app/app';

/**
 * Шаблон для отправки запроса на сервер
 * @param { string } baseUrl - Базовый URL
 * @param { string } url - URL запроса
 * @param { string } method - Метод запроса
 * @param { any } body - Тело запроса
 * @param { boolean } file - Файл
 * @returns { Promise<T> } - Возвращает промис с ответом от сервера
 */
export async function sendRequest<T>(
    baseUrl: string,
    url: string,
    method: string,
    body?: any,
    file?: boolean,
): Promise<T> {
    const response = await fetch(`${baseUrl}${url}`, {
        credentials: 'include',
        method,
        headers: {
            'X-Csrf-Token': store.getState().csrft,
        },
        body: file ? body : JSON.stringify(body),
    });

    if (response.status === 401) {
        store.dispatch({ type: 'UPDATE_AUTH', payload: false });
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}; ${await response.json()}`);
    }

    try {
        return new Promise(async (resolve, reject) => {
            try {
                const json = await response.clone().json();
                resolve(json);
            } catch (jsonError) {
                try {
                    const text = (await response.text()) as any;
                    resolve(text);
                } catch (textError) {
                    reject(textError);
                }
            }
        });
    } catch (error) {
        return Promise.reject(error);
    }
}
