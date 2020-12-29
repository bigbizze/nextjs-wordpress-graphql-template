import { print } from 'graphql/language/printer'

const API_URL = process.env.WP_API_URL;

export async function fetchAPI(query, { variables }: { variables?: any } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: print(query), variables })
    });
    const json = await res.json();
    if (json.errors) {
        console.log(json.errors);
        console.log('error details', print(query), variables);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}
