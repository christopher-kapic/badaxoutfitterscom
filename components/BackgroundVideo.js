
const ArrowDownCircleLogo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8h3l-4 4-4-4h3V8h2v4z"/></svg>

export const BackgroundVideo = ({title, children, lm="Learn more", video, lml="#", max_height="calc(100vh - 50px)", padding="24px"}) => {
  return (
    <>
      <div>
        <video autoPlay="autoplay" loop="loop" muted>
          <source src={video} type="video/mp4"/>
        </video>
        <div>
          {children}
        </div>
      </div>
      <style jsx>
        {`
          div {
            width: 100%;
            height: ${max_height};
            display: flex;
            padding: 32px 0;
            align-items: flex-end;
            justify-content: center;
            position: relative;
            z-index: -1;
          }
          div video {
            height: ${max_height};
            object-fit: cover;
            width: 100%;
            position: absolute;
            top: 0;
          }
          div div {
            width: auto;
            height: auto;
            display: inline-block;
            margin: 12px;
            padding: ${padding};
            border-radius: 6px;
            position: relative;
            z-index: 1;
            background: rgba( 100, 100, 100, 0.25 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 35, 0.37 );
            backdrop-filter: blur( 12px );
            -webkit-backdrop-filter: blur( 12px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
          }
        `}
      </style>
    </>
  )
}