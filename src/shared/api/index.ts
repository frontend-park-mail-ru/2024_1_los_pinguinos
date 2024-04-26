import { API_URL } from "../config";

export async function sendRequest<T>(url: string, method: string, body?: any): Promise<T> {
    const response = await fetch(`${API_URL}${url}`, {
        credentials: 'include',
        method,
        headers: {
            'Content-Type': 'application/json',
            'Csrft': localStorage.getItem('Csrft') || 'null',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}