export async function sendRequest<T>(
    baseUrl: string,
    url: string,
    method: string,
    body?: any,
    file?: boolean,
): Promise<T> {
    console.log(body);
    console.log(file);
    const response = await fetch(`${baseUrl}${url}`, {
        credentials: 'include',
        method,
        headers: {
            'X-Csrf-Token': localStorage.getItem('X-CSRF-TOKEN') || 'null',
        },
        body: file ? body : JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return response.json();
}
