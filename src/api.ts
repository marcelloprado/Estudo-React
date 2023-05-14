const BASE = 'https://jsonplaceholder.typicode.com'


export const api = {
    getAllPost: async () => {
        let response = await fetch(`${BASE}/posts`)
        let json = await response.json();
        return json;
    },
    addNewPost: async (title: string, body: string, userId: number) => {
        let response = await fetch(`${BASE}/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, body, userId }),
            headers: { 'content-type': 'application/json' }
        });
        let json = await response.json();
        return json;
    }
}