import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPagesWithSlug, getPage } from '../lib/get_pages';

import styles from '../styles/Home.module.css';
import blogStyles from '../styles/Blog.module.css';

export default function Page({ postData }) {
    const router = useRouter();
    console.log(postData);
    if (!router.isFallback && !postData?.slug) {
        return <p>hmm...looks like an error</p>;
    }
    const formatDate = date => {
        const newDate = new Date(date);

        return `${newDate.getDate()}/${
            newDate.getMonth() + 1
        }/${newDate.getFullYear()}`;
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>{postData?.title}</title>
                <link rel="icon" href='/favicon.ico'/>
            </Head>
            <main className={styles.main}>
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                    <article className={blogStyles.article}>
                        <div className={blogStyles.postmeta}>
                            <h2 className={styles.title}>{postData?.title}</h2>
                            <p>{formatDate(postData.date)}</p>
                        </div>
                        <div
                            className="post-content content"
                            dangerouslySetInnerHTML={{ __html: postData.content}}
                        />
                    </article>
                )}
                <p>
                    <Link href="/blog">
                        <a>back to articles</a>
                    </Link>
                </p>
            </main>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const data = await getPage(params.slug);
    return {
        props: {
            postData: data.page
        }
    };
}

export async function getStaticPaths() {
    const allPages = await getAllPagesWithSlug();
    return {
        paths: allPages.edges.map(({ node }) => `/${node.slug}`) || [],
        fallback: true
    };
}
