import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const MenuSVG = ({active=false, mobileQuery="375px", tabletQuery="769px"}) => {
  if (active) return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      <style jsx>
        {`
          @media (min-width: ${tabletQuery}) {
            svg {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      <style jsx>
        {`
          @media (min-width: ${tabletQuery}) {
            svg {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}

const DropdownSVG = ({active=false}) => {
  if (active) return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z"/></svg>
      {/* <style jsx>
        {`
          @media (min-width: ${tabletQuery}) {
            svg {
              display: none;
            }
          }
        `}
      </style> */}
    </>
  )
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z"/></svg>
      {/* <style jsx>
        {`
          @media (min-width: ${tabletQuery}) {
            svg {
              display: none;
            }
          }
        `}
      </style> */}
    </>
  )
}

const useWindowSize = (defaultSize={width: 1920, height: 1080}) => {
  const [size, setSize] = useState(defaultSize);
  useEffect(() => {
    if (window) {
      setSize({width: window.innerWidth, height: window.innerHeight});
    }
    const handleResize = () => {
      setSize({width: window.innerWidth, height: window.innerHeight});
    }
    window.addEventListener("resize", handleResize);
    return(() => {
      window.removeEventListener("resize", handleResize);
    })
  }, [])
  return size;
}


const NavbarLink = ({page, color, mobileColor="#222222", backgroundColor="#cccccc", dropdownBackgroundColor="#dddddd", padding="24px", fontSize="24px", height="32px", tabletQuery="769px", testing=false, setActive}) => {
  const [isOpen, setIsOpen] = useState(testing);
  const [sublinks, setSublinks] = useState(page.sublinks)
  useEffect(() => {
    setSublinks(page.sublinks);
  }, [])
  return (
    <>
      <li>
        <div>
          <div>
            <Link href={page.link}>
              <a onClick={() => setActive(false)}>{page.name}</a>
            </Link>
          </div>
          {page.sublinks.length > 0 ? 
            <button onClick={() => setIsOpen(!isOpen)}>
              <DropdownSVG active={isOpen}/>
            </button>
          : <></>}
        </div>
      </li>
      <style jsx>
        {`
          li {
            // ${color ? `color: ${color};` : ""}
            padding: ${padding};
            font-size: ${fontSize};
            // ${backgroundColor ? `background-color: ${backgroundColor};` : ""}
            transition: 0.1s;
            display: flex;
            flex-direction: column;
            margin: 8px 0px;
            border-radius: 4px;
            box-shadow: 4px 4px 6px #44444444, -4px -4px 18px #eeeeee79;
            border-width: .5px;
            border-color: #f0f0f0;
            border-style: solid;
            color: ${mobileColor};
          }
          li div {
            width: 100%;
            display: flex;
          }
          li ul {
            transform: translateX(${isOpen ? "0vw" : "100vw"});
            height: ${isOpen ? "100%" : "0"};
            transition: 0.1s;
          }
          li div div {
            width: ${page.sublinks.length > 0 ? `calc(100% - ${height})` : `100%`};
            padding: 0;
            margin: 0;
          }
          li div div a {
            display: inline-block;
            height: ${height};
            width: 100%;
          }
          li div button {
            height: ${height};
            width: ${height};
            display: flex;
            justify-content: center;
            align-items: center;
            right: 0px;
            border: none;
            text-decoration: none;
            padding: 0;
            ${backgroundColor ? `background-color: ${backgroundColor};` : ""}
          }
          @media (min-width: ${tabletQuery}) {
            li {
              text-shadow: 2px 2px 8px #000000;
              background-color: #00000000;
              padding: 0;
              box-shadow: none;
              padding: 2px 10px;
              transition: 0.4s;
              border: none;
              color: ${color};
              // box-shadow: 5px 5px 10px #01381b, -5px -5px 10px #015027;
            }
            li:hover {
              background-color: #000000a2;
              border-radius: 4px;
            }
            li div div {
              width: auto;
            }
            li div button {
              background-color: #00000000;
              cursor: pointer;
            }
            li ul {
              position: absolute;
              // transform: translateY(${height});
              transform: ${isOpen ? `translateY(calc(2*${height}))` : `translateY(-${height})`}
              display: ${isOpen ? "flex" : "none"};
              background-color: ${dropdownBackgroundColor};
              padding: calc(${height}/2);
              // display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        `}
      </style>
    </>
  )
}

const Navbar = ({ height="48px", fontSize="24px", backgroundColor="#eeeeee", mobileMenuBackgroundColor="#cccccc", color="#222222",
                  pages=[{
                    name: "Home",
                    link: "/home",
                    sublinks: []
                  }, {
                    name: "About",
                    link: "/about",
                    sublinks: [{
                      name: "Contact",
                      link: "/contact"
                    }]
                  }],
                  title="Kapic Navbar", tabletQuery="769px", testing=false}) => {
  const [active, setActive] = useState(testing);
  const titleRef = useRef();
  useEffect(() => {
    console.log(titleRef.current.offsetWidth)
  }, [titleRef])

  return (
    <>
      <nav>
        <span ref={titleRef}><Link href="/"><a>{title}</a></Link></span>
        <button onClick={() => setActive(!active)}>
          <MenuSVG active={active} tabletQuery={tabletQuery}/>
        </button>

        <ul>
          {pages.map((page, idx) => {
            return (
              <NavbarLink key={idx} page={page} fontSize={fontSize} color={color} setActive={setActive}/>
            )
          })}
        </ul>

      </nav>
      <style jsx>
        {`
          nav {
            background-image: url(/background-wood.jpeg);
            background-size: cover;
            background-attachment: fixed;
            z-index: 99;
            position: sticky;
            top: 0;
            width: 100%;
            height: ${height};
            display: flex;
            align-items: center;
            color: ${color};
          }
          nav span {
            font-size: ${fontSize};
            padding-left: calc(${fontSize}/2);
          }
          nav button {
            height: ${height};
            width: ${height};
            display: flex;
            justify-content: center;
            background-color: #00000000;
            color: ${color};
            align-items: center;
            position: absolute;
            right: 0px;
            border: none;
            text-decoration: none;
            cursor: pointer;
          }
          nav ul {
            height: calc(100vh - ${height});
            position: fixed;
            transform: translateX(${active ? "0vw" : "100vw"});
            transition: 0.1s;
            width: 100%;
            background-color: ${mobileMenuBackgroundColor}88;
            backdrop-filter: blur(4px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            top: ${height};
            margin: 0;
            list-style: none;
            padding: calc(${height}/2) calc(${height}/2) ${height} calc(${height}/2);
          }
          @media (min-width: ${tabletQuery}) {
            nav {
              position: sticky;
              padding: 0 calc(${height}/4);
              justify-content: space-between;
            }
            nav button {
              display: none;
            }
            nav ul {
              padding: 0;
              backdrop-filter: none;
              transform: translateX(0);
              position: relative;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
              top: 0;
              height: 100%;
              width: 70vw;
              // background-color: ${backgroundColor};
              background-color: #00000000;
            }
          }
        `}
      </style>
    </>
  )
}

export default Navbar