const ws = new WebSocket('https://render.com/docs/web-services#port-binding');
const msgdiv = document.querySelector(".TextDiv");
const input = document.querySelector("#input");
const send = document.querySelector("#Send");

ws.onmessage = (e) => {
    const msg = document.createElement('p');
    msg.innerText = e.data;
    msgdiv.appendChild(msg);
}

function sendmsg(){
    const umsg = document.createElement('p');
    const msg = input.value;
    umsg.innerText = msg;
    msgdiv.appendChild(umsg);
    ws.send(`${msg}`);
    input.value = '';
}

send.addEventListener("click" , sendmsg);