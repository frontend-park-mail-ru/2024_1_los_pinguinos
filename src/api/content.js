export const getPeople = async () => {
    try {
        const response = await fetch('https://swapi.co/api/people', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}