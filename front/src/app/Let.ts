export class Let{
    id:string;
    polazak:string;
    dolazak:string;
    datum:string;
    vreme_polaska:string;
    vreme_dolaska:string;
    tip:string;
    klasa:string;
    prevoznik:string;

    constructor(id:string, polazak:string, dolazak:string, datum:string, vreme_polaska:string, vreme_dolaska:string, tip:string,klasa:string,prevoznik:string){
        this.id=id;
        this.polazak=polazak;
        this.dolazak=dolazak;
        this.datum=datum;
        this.vreme_polaska=vreme_polaska;
        this.vreme_dolaska=vreme_dolaska;
        this.tip=tip;
        this.klasa=klasa;
        this.prevoznik=prevoznik;
        
    }
}
