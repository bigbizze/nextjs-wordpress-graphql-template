import gql from "graphql-tag";
import { fetchAPI } from "./api";

export async function getAllPosts() {
    const data = await fetchAPI(
        gql`
            query AllPosts {
                posts(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
                    edges {
                        node {
                            id
                            date
                            title
                            slug
                        }
                    }
                }
            }
        `
    );

    return data?.posts;
}

export async function getAllPostsWithSlug() {
    const data = await fetchAPI(
        gql`
            {
                posts(first: 10000) {
                    edges {
                        node {
                            slug
                        }
                    }
                }
            }
        `);
    return data?.posts;
}

export async function getPost(slug) {
    return await fetchAPI(
        gql`
            fragment PostFields on Post {
                title
                excerpt
                slug
                date
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
            }
            query PostBySlug($id: ID!, $idType: PostIdType!) {
                post(id: $id, idType: $idType) {
                    ...PostFields
                    content
                }
            }
        `,
        {
            variables: {
                id: slug,
                idType: 'SLUG'
            }
        }
    );
}
