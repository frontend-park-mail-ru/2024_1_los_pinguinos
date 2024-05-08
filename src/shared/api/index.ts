import { store } from '../../app/app';
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
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}
