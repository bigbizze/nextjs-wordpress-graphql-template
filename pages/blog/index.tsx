import Head from 'next/head';
import Link from 'next/link';

// data

// styles
import styles from '../../styles/Home.module.css';
import blogStyles from '../../styles/Blog.module.css';
import { getAllPosts } from "../../lib/get_posts";

const Blog = ({ allPosts: { edges } }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Blog articles page</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Latest blog articles</h1>
                <hr />
                <section>
                    {edges.map(({ node }) => (
                        <div className={blogStyles.listitem} key={node.id}>
                            <div className={blogStyles.listitem__thumbnail}>
                                {/*<figure>*/}
                                {/*    <img*/}
                                {/*        src={node.extraPostInfo.thumbImage.mediaItemUrl}*/}
                                {/*        alt={node.title}*/}
                                {/*    />*/}
                                {/*</figure>*/}
                            </div>
                            <div className={blogStyles.listitem__content}>
                                <h2>{node.title}</h2>
                                {/*<p>{node.extraPostInfo.authorExcerpt}</p>*/}
                                <Link href={`/blog/${node.slug}`}>
                                    <a>Read more</a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

// async function fetchApi(query, { variables, preview }: { variables?: any, preview?: any } = {}) {
//     const { loading, error, data } = useQuery(ALL_PLAYERS_QUERY);
// }
export async function getStaticProps() {
    const allPosts = await getAllPosts();
    return {
        props: {
            allPosts
        }
    };
}

export default Blog;
