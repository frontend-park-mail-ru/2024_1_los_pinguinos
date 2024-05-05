export async function sendRequest<T>(
    baseUrl: string,
    url: string,
    method: string,
    body?: any,
): Promise<T> {
    const response = await fetch(`${baseUrl}${url}`, {
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
