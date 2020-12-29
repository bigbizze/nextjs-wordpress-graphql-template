import Head from 'next/head'
import Link from 'next/link';
import { getAllPages } from "../lib/get_pages";

export default function Home({ allPages: { edges } }) {
  return (
    <div className="home_container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="home_main">
        <h1 className="home_title">Welcome to our demo blog!</h1>
          <section>
              {edges.map(({ node }) => (
                  <div className="blog_listitem" key={node.id}>
                      <div className="listitem__thumbnail">
                      </div>
                      <div className="listitem__content">
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

      <footer className="home_footer">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="home_logo" />
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
