import Head from 'next/head'
import { BackgroundVideo } from '../components/BackgroundVideo'
import { Directus } from '@directus/sdk';
import styles from '../styles/Home.module.css'


export default function Home({data}) {
  const {title, description, video, content} = data;
  return (
    <>
      <Head>
        <title>Bad Ax Outfitters</title>
        <meta name="description" content="Premiere hunting in Wisconsin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BackgroundVideo title="Ross Outfitters" video="https://rossoutfitters.b-cdn.net/ro-home34.mp4" lml="#about"> */}
      {/* <BackgroundVideo title="Ross Outfitters" video="/videos/clip1.mov" lml="#about"> */}
      <BackgroundVideo title="Ross Outfitters" video={video} lml="#about">
        {/* clip1, clip6 */}
        <p style={{color: "white", textShadow: "2px 2px 6px #000000"}}>{title}</p>
        <p style={{color: "white", textShadow: "2px 2px 6px #000000"}}>{description}</p>
      </BackgroundVideo>

      <div className={styles.div}>
        {/* <img src="/icostarter.png" alt="Italian Trulli" width="300"></img> */}
        <main dangerouslySetInnerHTML={{ __html: content }}/>
        {/* <main>
          This is a second main section.. Woah, I didn&apos;t know you could do that!
        </main> */}
      </div>
      <style jsx>
        {`
          div {
            background-image: url(/background-wood-smaller.png);
            background-size: cover;
            background-attachment: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 12px;
          }
          div main {
            max-width: 800px;
            width: 100%;
            color: white;
            text-shadow: 2px 2px 6px #000000;
            padding: 24px;
            margin: 12px;
            background: rgba( 200, 200, 200, 0.20 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 35, 0.37 );
            backdrop-filter: blur( 6px );
            -webkit-backdrop-filter: blur( 6px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
            display: inline-block;
            overflow: hidden;
          }
          @media (min-width: 769px) {
            div main {
              width: 80%;
            }
          }
        `}
      </style>
    </>
  )
}

export async function getStaticProps(context) {
  const directus = new Directus(`https://${process.env.DIRECTUS_URL}`, {
    auth: {
      staticToken: process.env.DIRECTUS_READ_API_KEY, // If you want to use a static token, otherwise check below how you can use email and password.
    },
  });
  const home = await directus.items('home').readByQuery({meta: 'total_count'})
  const { data } = home;
  return {
    props: {
      data
    }
  }
}