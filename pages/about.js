import Head from 'next/head'
import Image from 'next/image'
import { BackgroundVideo } from '../components/BackgroundVideo'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Bad Ax Outfitters</title>
        <meta name="description" content="Premiere hunting in Wisconsin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BackgroundVideo title="Ross Outfitters" video="https://rossoutfitters.b-cdn.net/ro-home34.mp4" lml="#about"> */}
      <BackgroundVideo title="Ross Outfitters" video="/videos/clip6.mov" lml="#about">
        {/* clips: clip4, clip6 */}
      {/* <BackgroundVideo title="Ross Outfitters" video="https://rossoutfitters.b-cdn.net/clip3.mov" lml="#about"> */}
        <p style={{color: "white", textShadow: "2px 2px 6px #000000"}}>Test</p>
        <p style={{color: "white", textShadow: "2px 2px 6px #000000"}}>This content will be filled by Jake Ross. It can be as long or as short as he would like it to be, but too much is not a good idea.</p>
      </BackgroundVideo>

      <div>
        <main>
          <h1>Ross Outfitters</h1>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        <p>This is Christopher typing a lot of text. How far will it go? That is a good question to ask.</p>
        </main>
        <main>
          This is a second main section.. Woah, I didn't know you could do that!
        </main>
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
