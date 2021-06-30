import{Chatroom} from "./chat.js";
import{ChatUI} from "./ui.js";

//DOM
let body = document.querySelector("body");
let ulChatList = document.querySelector("ul");
let inputMessage = document.querySelector("#inputMessage");
let btnSend = document.querySelector("#btn1");
let inputUsername = document.querySelector("#inputUsername");
let btnUpdate = document.querySelector("#btn2");
let rooms = document.querySelector("nav");
let btnRooms = rooms.querySelectorAll("button");
let pickColor = document.querySelector("#pickColor");
let updateColor = document.querySelector("#updateColor");




let username =() => {
    if(localStorage.username){
        return localStorage.username;
    }
    else{
        return "anonymus";
    }
}

//Čitamo iz lokalne memorije room, ukoliko postiji, u suprotnom default je "general"
let room = () => {
    if(localStorage.room){
        return localStorage.room;
    }
    else{
        return "general";
    }
}

//Kreiramo objekat klase Chatroom
let chatroom2 = new Chatroom(room(), username());
//Kreiranje objekat klase ChatUI
let chatUL1 = new ChatUI(ulChatList);

//Kada se ucitava prvi put stranica, ispisemo cetove u njoj
chatroom2.getChats(data => {
    chatUL1.templateLI(data);
});


btnSend.addEventListener("click", () => {
    let msg = inputMessage.value;
    let msgTrim = msg.trim();
    if(msgTrim == 0){
        alert("Morate uneti poruku!")
    }
    else{
        chatroom2.addChat(msgTrim)
        .then(() => inputMessage.value = "")
        .catch(err => console.log(err));
    } 
});

btnUpdate.addEventListener("click", () => {
    let username =inputUsername.value;
    chatroom2.updateUsername(username);
    inputUsername.value = "";
    let ispisImena = document.querySelector("footer");
    ispisImena.textContent = chatroom2.username + " je trenutno korisnicko ime!";
    setTimeout(() => {
        ispisImena.textContent = "";
    } ,3000);
});

rooms.addEventListener("click", e => {
    if(e.target.tagName == "BUTTON"){
        btnRooms.forEach(room => {
            room.classList.remove("active");
        });
        let activeRoom = e.target;
        chatUL1.clear();
        let newR = e.target.id
        chatroom2.updateRoom(newR);  
        activeRoom.classList.add("active");  
        chatroom2.getChats(chat => {
            chatUL1.templateLI(chat);
        });
    }
});


updateColor.addEventListener("click", () => {
    setTimeout(() => {
        let color = pickColor.value;
        body.style.backgroundColor = color;
    }, 500);
    
});
localStorage.setItem("backgroundColor", pickColor.value);
body.style.backgroundColor = localStorage.backgroundColor;

