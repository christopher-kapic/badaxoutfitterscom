import { useEffect, useState, useRef } from "react";
import { useRouter } from 'next/router'
const ArrowDownCircleLogo = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8h3l-4 4-4-4h3V8h2v4z"/></svg>

const PurchaseBackNext = ({state, setState, noBack=false, noNext=false}) => {
  return (
    <>
      <div>
        { noBack ? <>
          <button style={{opacity: 0}}>Back</button>
        </> :
        <>
          <button onClick={() => {setState(state-1)}}>Back</button>
        </>}
        { noNext ? <>
          <button style={{opacity: 0}}>Next</button>
        </> :
        <>
          <button onClick={() => {setState(state+1)}}>Next</button>
        </>}
      </div>
      <style jsx>
        {`
          div {
            width: 100%;
            padding: 0px;
            margin: 8px 0px 0px 0px;
            border: none;
            backdrop-filter: none;
            background-color: #00000000;
            display: flex;
            justify-content: space-between;
          }
          div button {
            background-color: #00000044;
            border-radius: 4px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #eeeeee;
            text-shadow: 2px 2px 8px #000000;
            outline: none;
            border: none;
            cursor: pointer;
          }
          div button:hover {
            background-color: #00000088;
          }
        `}
      </style>
    </>
  )
}

export const PurchaseDialog = ({maxPartySize=5}) => {
  const [availableHunts, setAvailableHunts] = useState([])
  const router = useRouter()
  const [step, setStep] = useState(0);
  const [partySize, setPartySize] = useState(1);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const emailRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();
  const [selectedHunt, setSelectedHunt] = useState()
  useEffect(() => {
    if (partySize <= 0) {
      setPartySize(1);
    }
    if (partySize > maxPartySize) {
      setPartySize(maxPartySize);
    }
  }, [partySize])
  useEffect(async () => {
    fetch('/api/getAvailableHunts', {
      method: "POST",
      body: JSON.stringify({
        partySize: partySize
      })
    }).then(res => res.json()).then(data => setAvailableHunts(data.data))
  }, [step])
  useEffect(() => {
    console.log(availableHunts)
  }, [availableHunts])
  return (
    <>
      <div id="party-size" className="cont">
        <span>How many people are in your party?</span>
        <div id="party-size-div">
          <button onClick={() => setPartySize(partySize - 1)} style={{opacity: `${(partySize === 1) ? 0 : 1}`}}>-</button>
          <span>
            {partySize}
          </span>
          <button onClick={() => setPartySize(partySize + 1)} style={{opacity: `${(partySize === maxPartySize) ? 0 : 1}`}}>+</button>
        </div>
        <PurchaseBackNext state={step} setState={setStep} noBack={true} setAvailableHunts={setAvailableHunts}/>
      </div>
      <div id="date" className="cont">
        <span>Choose a hunt.</span>
        {availableHunts.map((hunt) => {
          console.log(hunt)
          const start = new Date(hunt.starts)
          const ends = new Date(hunt.ends)
          return(
            <div style={{
              borderColor: `${(selectedHunt === hunt.id) ? '#4fa476' : 'white'}`,
              borderWidth: 3,
              borderStyle: 'solid',
              borderRadius: 4,
              padding: 6,
              backgroundColor: `${(selectedHunt === hunt.id) ? '#3f9466' : '#222222'}`,
              cursor: 'pointer',
              margin: '3px 0px'
            }} key={hunt.id} onClick={() => setSelectedHunt(hunt.id)}>
              <div><span style={{padding: "0 4px 0 0"}}>Starts: {start.getMonth()}/{start.getDate()}/{start.getFullYear()}</span><span style={{padding: "0 0 0 4px"}}>Ends: {ends.getMonth()}/{ends.getDate()}/{ends.getFullYear()}</span></div>
              <div>Downpayment: ${hunt.down_payment}</div>
              <div>Cash on arrival: ${hunt.cash_on_arrival}</div>
            </div>
          )
        })}
        <PurchaseBackNext state={step} setState={setStep}/>
      </div>
      <div id="information" className="cont">
        <span>Name</span>
        <input type="text" ref={nameRef} required placeholder="Required"></input>
        <span>Email</span>
        <input type="text" ref={emailRef} required placeholder="Required"></input>
        <span>Phone</span>
        <input type="text" ref={phoneRef} required placeholder="Required"></input>
        {(paymentError === "") ? <></> : <span style={{color: 'white'}}>{paymentError}</span>}
        <button onClick={() => {
          setPaymentLoading(true)
          console.log(nameRef.current.value === "") 
          if (nameRef.current.value === "") {
            setPaymentError("Please enter your name.")
            setPaymentLoading(false)
            return;
          } else if (phoneRef.current.value === "") {
            setPaymentError("Please enter your phone number.")
            setPaymentLoading(false)
            return;
          } else if (emailRef.current.value === "") {
            setPaymentError("Please enter your email address.")
            setPaymentLoading(false)
            return;
          } else if (!selectedHunt) {
            setPaymentError("Please choose a hunt.")
            setPaymentLoading(false)
            return;
          } else if (!partySize) {
            setPaymentError("Invalid party size.")
            setPaymentLoading(false)
            return;
          } else if (phoneRef.current.value.replace(/\D/g,'').length < 7) {
            setPaymentError("Invalid phone number.")
            setPaymentLoading(false)
          }

          fetch('/api/getStripeCheckout', {
            method: "POST",
            body: JSON.stringify({
              name: nameRef.current.value,
              email: emailRef.current.value,
              phone: phoneRef.current.value,
              huntId: selectedHunt,
              partySize: partySize
            })
          }).then(res => res.json()).then(json => {
            window.open(json.url)
            router.push('/')
          })
        }}>{paymentLoading ? "Loading..." : "Continue to Payment"}</button>
        <PurchaseBackNext state={step} setState={setStep} noNext={true}/>
      </div>
      <style jsx>
        {`
          .cont {
            width: auto;
            height: auto;
            transition: 0.2s;
            color: #eeeeee;
            text-shadow: 2px 2px 8px #000000;
            margin: 12px;
            padding: 24px;
            border-radius: 6px;
            position: relative;
            z-index: 2;
            background: rgba( 100, 100, 100, 0.25 );
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 35, 0.37 );
            backdrop-filter: blur( 12px );
            -webkit-backdrop-filter: blur( 12px );
            border-radius: 10px;
            border: 1px solid rgba( 255, 255, 255, 0.18 );
            display: flex;
            flex-direction: column;
          }
          div span {
            padding: 10px 0px;
          }
          #party-size-div {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 0px;
            margin: 0px;
            background-color: #00000000;
            box-shadow: none;
            backdrop-filter: none;
            border: none;
          }
          #party-size-div span {
            width: 40px;
            display: flex;
            justify-content: center;
            font-size: 28px;
          }
          #party-size-div button {
            background-color: #00000000;
            border: none;
            outline: none;
            text-shadow: 2px 2px 8px #000000;
            font-size: 28px;
            cursor: pointer;
            color: #eeeeee;
          }
          #party-size-div button:hover {
            color: #cccccc;
          }
          #party-size-input {
            outline: none;
            border-radius: 4px;
            font-size: 34px;
            width: 56px;
            border-color: white;
            border-style: solid;
          }
          #party-size {
            position: fixed;
            ${step > 0 ? "transform: translateX(-100vw)" : ""}
            ${step < 0 ? "transform: translateX(100vw)" : ""}
          }
          #date {
            position: fixed;
            ${step > 1 ? "transform: translateX(-100vw)" : ""}
            ${step < 1 ? "transform: translateX(100vw)" : ""}
          }
          #information {
            position: fixed;
            ${step > 2 ? "transform: translateX(-100vw)" : ""}
            ${step < 2 ? "transform: translateX(100vw)" : ""}
          }
          #information input {
            min-width: 300px; 
            outline-color: #2b3e50;
            font-size: 20px;
            height: 28px;
            border-radius: 4px;
            border-style: solid;
            border-color: #eeeeee;
          }
          #information button {
            background-color: ${ paymentLoading ? "#cccccc" : "#3473e0"};
            // height: 28px;
            border-radius: 4px;
            border-style: solid;
            border: none;
            margin: 8px 0px;
            font-size: 20px;
            ${paymentLoading ? "" : "text-shadow: 2px 2px 8px #000000;"}
            padding: 8px;
            color: ${ paymentLoading ? "#222222" : "#eeeeee"};
            ${paymentLoading ? "" : "cursor: pointer;"}
          }
          #information button:hover {
            background-color: ${ paymentLoading ? "#cccccc" : "#22313f"};
          }
        `}
      </style>
    </>
  )
}

export const PurchaseVideo = ({title, children, lm="Learn more", video, lml="#", max_height="calc(100vh - 50px)", padding="24px"}) => {
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
            z-index: 1;
          }
          div video {
            height: ${max_height};
            object-fit: cover;
            width: 100%;
            position: absolute;
            top: 0;
            z-index: 1;
          }
          div div {
            position: relative;
            // display: grid;
            // grid-template: 1fr / 1fr;
            place-items: center;
          }
        `}
      </style>
    </>
  )
}