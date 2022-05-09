export class Prevoznik{
    id:string;
    ime:string;
    opis:string;
    ocena:string;
    slika:string;

    constructor(id:string, ime:string, opis:string, ocena:string, slika:string){
        this.id=id;
        this.ime=ime;
        this.opis=opis;
        this.ocena=ocena;
        this.slika=slika;
    }
}
