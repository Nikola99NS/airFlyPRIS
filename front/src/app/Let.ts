export class Let{
    id:string;
    polazak:string;
    dolazak:string;
    datum:string;
    vreme_polaska:string;
    vreme_dolaska:string;
    tip:string;
    prevoznik_id:string;
    prevoznik_ime:string;
    cena_ekonomska:string;
    cena_biznis:string;
    slobodna_mesta: string;
    tipAviona: string;

    constructor(id:string, polazak:string, dolazak:string, datum:string, vreme_polaska:string, vreme_dolaska:string, tip:string, prevoznik_id:string, prevoznik_ime:string, cena_ekonomska:string, cena_biznis:string, slobodna_mesta:string, tip_aviona:string){
        this.id=id;
        this.polazak=polazak;
        this.dolazak=dolazak;
        this.datum=datum;
        this.vreme_polaska=vreme_polaska;
        this.vreme_dolaska=vreme_dolaska;
        this.tip=tip;
        this.prevoznik_id=prevoznik_id;
        this.prevoznik_ime=prevoznik_ime;
        this.cena_ekonomska=cena_ekonomska;
        this.cena_biznis=cena_biznis;
        this.slobodna_mesta=slobodna_mesta;
        this.tipAviona=tip_aviona;
    }
}
