export class Chatroom{
    constructor(room, username){
        this.room=room;
        this.username=username;
        this.chats = db.collection("chats");
        this.unsub;
    }

    set room(x){
        this._room = x;
    }
    set username(x){
        if(x.trim().length > 2 && x.trim().length < 10 && x != /\s/g){
            this._username = x;
        }
        else{
            alert("Username nije validan!");
        }

    }

    get room(){
        return this._room;
    }
    get username(){
        return this._username;
    }

    updateUsername(x){
        this.username = x;
        localStorage.setItem("username", x);

        
    }
    updateRoom(x){
        this.room = x;
        localStorage.setItem("room", x);
        if(this.unsub){
            this.unsub();
        }
    }

    async addChat(msg){
        let d = new Date();
        let chat = {
            message: msg,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(d)
        }
        let response = await this.chats.add(chat);
        return response;
    }

    getChats(callback){
        this.unsub = this.chats
        .where("room", "==", this.room)
        .orderBy("created_at")
        .onSnapshot( snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == "added"){
                    callback(change.doc.data())
                }
            });
        });
    }
  
}

