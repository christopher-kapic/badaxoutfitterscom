import '../styles/globals.css'
import Navbar from '../components/kapic/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar title="Bad Ax Outfitters" height="50px" fontSize='20px' mobileMenuBackgroundColor='#dddddd' color="#ffffff" mobileColor="#222222" backgroundColor='#014421'
      pages={[
        // {
        //   name: "Trophy Whitetail",
        //   link: "/trophy-whitetail",
        //   sublinks: []
        // },
        {
          name: "Home",
          link: "/",
          sublinks: []
        },
        {
          name: "Trail Cameras",
          link: "/trail-cameras",
          sublinks: []
        },
        // {
        //   name: "About Bad Ax",
        //   link: "/about",
        //   sublinks: []
        // },
        {
          name: "Buy a Hunt",
          link: "/purchase",
          sublinks: []
        },
        {
          name: "Bad Ax Workshop",
          link: "/workshop",
          sublinks: []
        }
      ]}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
