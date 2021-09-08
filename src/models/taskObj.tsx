class taskObj {
    id:    string;
    text:  string;
    constructor();
    constructor(todoText: string);
    constructor(id: string, todoText: string);
    constructor(id?: string, todoText?: string){
        this.id = id || getNextId().toString();
        this.text = todoText || "";
    }
}

function getNextId() : number {
    let tmpId = (parseInt(localStorage.tmpId) || 0);
    tmpId++;
    localStorage.setItem("tmpId", tmpId.toString());
    return tmpId;
}

export default taskObj;