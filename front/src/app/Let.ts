export class Let{
    id:string;
    polazak:string;
    dolazak:string;
    datum:string;
    vreme_polaska:string;
    vreme_dolaska:string;

    constructor(id:string, polazak:string, dolazak:string, datum:string, vreme_polaska:string, vreme_dolaska:string){
        this.id=id;
        this.polazak=polazak;
        this.dolazak=dolazak;
        this.datum=datum;
        this.vreme_polaska=vreme_polaska;
        this.vreme_dolaska=vreme_dolaska;
    }
}
