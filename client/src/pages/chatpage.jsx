import { useReducer, useRef, useState } from "react";

const ws = new WebSocket('ws://localhost:1021');

export function ChatPage(){
    const [ytext , setytext] = useState("");
    const [text , settext] = useState("");
    const inref = useRef("");
    
    ws.onmessage = (e) => {
        const intext = e.data;
        settext(intext);
    }
    const send = () => {
        ws.send(`user : ${inref.current}`);
        setytext(inref.current);
    }

    return(
        <>
          <input type="text" onChange={(e) => {inref.current = e.target.value}}/>
          <button onClick={send}>send</button>
          <div>
            {ytext ? <p>You : {ytext}</p> : null}
            {text ? <p>{text}</p> : null} 
          </div>
        </>
    );
}