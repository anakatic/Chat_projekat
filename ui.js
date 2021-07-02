export class ChatUI{
    constructor(l){
        this.list = l;
    }
    set list(l){
        this._list = l;
    }
    get list(){
        return this._list
    }
    clear(){
        this.list.innerHTML = "";
    }
    formatDate(date){
        let d = date.getDate();
        let g = date.getFullYear();
        let m = date.getMonth() + 1;
        let h = date.getHours();
        let min = date.getMinutes(); 

        let datum = new Date();
        let danasnjiDan = datum.getDate();
        let mesec = datum.getMonth() + 1;
        let godina = datum.getFullYear();
        
        d = String(d).padStart(2, "0");
        m = String(m).padStart(2, "0");
        h = String(h).padStart(2, "0");
        min = String(min).padStart(2, "0");
        if(g == godina && m == mesec && d == danasnjiDan){
            return  h + ":" + min; 
        }
        else{
            return d + "." + m + "."  + g + ". - " + h + ":" + min;   
        }     
       
    }
    templateLI(docMsg){
        this.list.innerHTML == "";
        let date = docMsg.created_at.toDate();
        let li = document.createElement("li");
        let trashB = document.createElement("div");
        let trash = document.createElement("img");
        if(localStorage.username == docMsg.username || docMsg.username == "Ana"){
            li.classList.add("right");
            trash.classList.add("me");
        }
        else{
            li.classList.add("standard");
            trash.classList.add("others");
        }

        let msg = document.createElement("p");
        msg.innerHTML =  `<b>${docMsg.username}: </b>${docMsg.message} <br>  ${this.formatDate(date)}`;
        trash.setAttribute("src", "trash-alt-solid.svg")
        trashB.appendChild(trash);
        trashB.classList.add("trash");
        li.appendChild(trashB);
        li.appendChild(msg);
        this.list.appendChild(li);
        this.list.scrollTop = this.list.scrollHeight;


        trashB.addEventListener("click", (e) => {
            let msg = e.target.parentElement.parentElement;
            if(e.target.classList == "me") {
                if (confirm("Do you really want to delete the message?")) {
                    this.list.removeChild(msg);
                    db.collection("chats")
                    .where("username", "==", docMsg.username)
                    .where("message", "==", docMsg.message)
                    .where("created_at", "==", docMsg.created_at)
                    .get()
                    .then(querrySnapshot => {
                        querrySnapshot.forEach(data => {
                            db.collection("chats").doc(`${data.id}`).delete()
                        })
                    })
                    .catch(err => console.log(err));                 
                }
            }
            else {
                this.list.removeChild(msg);
            }
        });
    }
}


