import Head from 'next/head'
import { PurchaseVideo, PurchaseDialog } from '../components/PurchaseVideo'
import { Directus } from '@directus/sdk';
const directus = new Directus(process.env.DIRECTUS_URL);


export default function Purchase() {
  return (
    <>
      <Head>
        <title>Bad Ax Outfitters</title>
        <meta name="description" content="Premiere hunting in Wisconsin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <BackgroundVideo title="Ross Outfitters" video="https://rossoutfitters.b-cdn.net/ro-home34.mp4" lml="#about"> */}
      <PurchaseVideo title="Ross Outfitters" video="/videos/clip8.mov" lml="#about">
        <PurchaseDialog />
      </PurchaseVideo>
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