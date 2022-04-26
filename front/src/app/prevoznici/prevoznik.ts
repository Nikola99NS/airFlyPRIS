export class Prevoznik{
    id:string;
    ime:string;
    opis:string;
    slika:string;
   
    constructor(id:string, ime:string, opis:string, slika:string, vreme_polaska:string, vreme_dolaska:string, tip:string,klasa:string,prevoznik:string){
        this.id=id;
        this.ime=ime;
        this.opis=opis;
        this.slika=slika;
       
        
    }
}