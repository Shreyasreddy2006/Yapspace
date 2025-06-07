// const ws = new WebSocket('wss://yapspace-kj2b.onrender.com');

const ws = new WebSocket('http://localhost:1021');

const msgdiv = document.querySelector(".TextDiv");
const input = document.querySelector("#input");
const send = document.querySelector("#Send");
const url = "http://localhost:1021/Messages";

ws.onmessage = (e) => {
    const msg = document.createElement('p');
    msg.innerText = e.data;
    msgdiv.appendChild(msg);
}

async function sendMsg(){
    const umsg = document.createElement('p');
    const msg = input.value;
    umsg.innerText = msg;
    msgdiv.appendChild(umsg);
    ws.send(`${msg}`);
    input.value = '';

    const user = localStorage.getItem("user");

    if(!msg){
        alert('please type something!!!!');
        return;
    }

    try{
        const res = await fetch(url , {
            method: 'POST',
            headers: {'content-Type' : 'application/json'},
            body: JSON.stringify({user : `${user}` , message : `${msg}`})
        });
        
        if(!res.ok){
            throw new Error('failed to save msg to database')
        }
        
        fetchMsg();
    }catch(err){
        alert(err.message);
        console.log(err);
    }
}

send.addEventListener("click" , sendMsg);

async function fetchMsg(){
    try{
    const res = await fetch(url);
    const msgs = await res.json();

    const chatarea = document.querySelector('.TextDiv');

    chatarea.innerHTML = '';

    msgs.forEach(msg => {
        const mdiv = document.createElement('div');

        mdiv.innerHTML = `
          <div>
             <p>${msg.user} : ${msg.message}</p>
          </div>
        `;
        chatarea.appendChild(mdiv);
    });
   }catch(err){
      console.log(`error : ${err}`)
   }
}

fetchMsg();