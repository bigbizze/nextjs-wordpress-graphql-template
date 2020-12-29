import gql from "graphql-tag";
import { fetchAPI } from "./api";


export async function getAllPages() {
    const data = await fetchAPI(
        gql`
            query AllPages {
                pages(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
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

    return data?.pages;
}

export async function getAllPagesWithSlug() {
    const data = await fetchAPI(
        gql`
            {
                pages(first: 10000) {
                    edges {
                        node {
                            slug
                        }
                    }
                }
            }
        `);
    return data?.pages;
}

export async function getPage(slug) {
    return await fetchAPI(
        gql`
            fragment PageFields on Page {
                title
                slug
                date
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
            }
            query PageBySlug($id: ID!, $idType: PageIdType!) {
                page(id: $id, idType: $idType) {
                    ...PageFields
                    content
                }
            }
        `,
        {
            variables: {
                id: slug,
                idType: 'URI'
            }
        }
    );
}
