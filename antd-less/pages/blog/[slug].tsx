import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
// import '../../styles/test.css';
import { getAllPostsWithSlug, getPost } from '../../lib/get_posts';

export default function Post({ postData }) {
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
        <div className="home_container">
            <Head>
                <title>{postData?.title}</title>
                <link rel="icon" href='/favicon.ico'/>
            </Head>
            <main className="home_main">
                {router.isFallback ? (
                    <h2>Loading...</h2>
                ) : (
                    <article className="blog_article">
                        <div className="blog_postmeta">
                            <h2 className="home_title">{postData?.title}</h2>
                            <p>{formatDate(postData.date)}</p>
                        </div>
                        <div
                            className="post-content content post-template-default single single-post postid-6 single-format-standard wp-embed-responsive singular enable-search-modal missing-post-thumbnail has-single-pagination showing-comments show-avatars footer-top-visible elementor-default elementor-kit- elementor-page elementor-page-6"
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
    const data = await getPost(params.slug);
    return {
        props: {
            postData: data.post
        }
    };
}

export async function getStaticPaths() {
    const allPosts = await getAllPostsWithSlug();
    return {
        paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
        fallback: true
    };
}
