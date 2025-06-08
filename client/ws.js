const ws = new WebSocket('wss://yapspace-9oex.onrender.com');

// const ws = new WebSocket('http://localhost:1021');

const msgdiv = document.querySelector(".TextDiv");
const input = document.querySelector("#input");
const send = document.querySelector("#Send");
const url = "https://yapspace-9oex.onrender.com/Messages";

ws.onmessage = (e) => {
    const msg = document.createElement('div');
    msg.className = 'message received';
    const msgContent = document.createElement('p');
    msgContent.innerText = e.data;
    msg.appendChild(msgContent);
    msgdiv.appendChild(msg);
    fetchMsg();
}

async function sendMsg(){
    const umsg = document.createElement('div');
    umsg.className = 'message sent';
    const msgContent = document.createElement('p');
    const msg = input.value;
    msgContent.innerText = msg;
    umsg.appendChild(msgContent);
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
        mdiv.className = 'message ' + (msg.user === localStorage.getItem("user") ? 'sent' : 'received');

        mdiv.innerHTML = `
          <div class="message-content">
             <span class="username">${msg.user}</span>
             <p>${msg.message}</p>
          </div>
        `;
        chatarea.appendChild(mdiv);
    });
   }catch(err){
      console.log(`error : ${err}`)
   }
}

fetchMsg();