import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { getAllPages } from "../lib/get_pages";
import blogStyles from "../styles/Blog.module.css";

export default function Home({ allPages: { edges } }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to our demo blog!</h1>
          <section>
              {edges.map(({ node }) => (
                  <div className={blogStyles.listitem} key={node.id}>
                      <div className={blogStyles.listitem__thumbnail}>
                      </div>
                      <div className={blogStyles.listitem__content}>
                          <h2>{node.title}</h2>
                          {/*<p>{node.extraPostInfo.authorExcerpt}</p>*/}
                          <Link href={`/${node.slug}`}>
                              <a>Read more</a>
                          </Link>
                      </div>
                  </div>
              ))}
          </section>
        <p>
          You can find more articles on the{' '}
          <Link href='/blog'>
            <a>blog articles page</a>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
    const allPages = await getAllPages();
    return {
        props: {
            allPages
        }
    };
}
