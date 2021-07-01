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
        let date = docMsg.created_at.toDate();
        let addLi 
        if(localStorage.username == docMsg.username || docMsg.username == "Ana"){
            addLi = 
            `<li class="right"> 
            <span>${docMsg.username} : </span> 
            <span>${docMsg.message}</span> 
            <br>
            <span> ${this.formatDate(date)} </span> 
            <i class="fa fa-trash" id="me"></i>    
            </li> `;
        }
        else{
            addLi =
            `<li class="standard"> 
            <span>${docMsg.username} : </span> 
            <span>${docMsg.message}</span> 
            <br>
            <span> ${this.formatDate(date)} </span> 
            <i class="fa fa-trash" id="others"></i>            
            </li> `;
        }
        
        this.list.innerHTML += addLi;
        this.list.scrollTop = this.list.scrollHeight;

     this.list.addEventListener("click", e => {
        if(e.target.id == "others"){
           
        }
     });
    }
}


