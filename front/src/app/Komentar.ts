export class Komentar{
  korisnik:string;
  // id_prevoznik:string;
  tekst:string;

  constructor(korisnik:string, tekst:string){
      this.korisnik=korisnik;
      // this.id_prevoznik=id_prevoznik;
      this.tekst=tekst;
  }
}
