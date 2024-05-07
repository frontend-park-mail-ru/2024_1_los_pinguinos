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
            'X-Csrf-Token': localStorage.getItem('X-CSRF-TOKEN') || 'null',
            Csrft: localStorage.getItem('X-CSRF-TOKEN') || 'null',
        },
        body: file ? body : JSON.stringify(body),
    });

    if (!response.ok) {
        store.dispatch({ type: 'UPDATE_AUTH', payload: false });
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}
