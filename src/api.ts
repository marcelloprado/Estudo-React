import axios from 'axios';

// const BASE = 'https://jsonplaceholder.typicode.com';

const http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

export const api = {
    getAllPost: async () => {
                //COM AXIOS
           let response = await http.get(`/posts`)
           // let response = await axios.get(`${BASE}/posts`)
           return response.data;
        
                //COM FETCH
        /* 
        let response = await fetch(`${BASE}/posts`)
        let json = await response.json();
        return json;
        */
    },
    addNewPost: async (title: string, body: string, userId: number) => {
                //COM AXIOS
        let response = await http.post(`/posts`, { title, body, userId
        });
        return response.data
        
                // COM FETCH 
        /*
        let response = await fetch(`${BASE}/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, body, userId }),
            headers: { 'content-type': 'application/json' }
        });
        let json = await response.json();
        return json;
        */
    }
}