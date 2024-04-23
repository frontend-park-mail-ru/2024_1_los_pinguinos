import { API_URL } from "../config";
import { store } from "../../../index"

export async function sendRequest<T>(url: string, method: string, body?: any): Promise<T> {
    const response = await fetch(`${API_URL}${url}`, {
        credentials: 'include',
        method,
        headers: {
            'Content-Type': 'application/json',
            'Csrdt': store.getState().session.token,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}