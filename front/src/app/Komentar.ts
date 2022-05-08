export class Komentar{
  id_korisnik:string;
  id_prevoznik:string;
  tekst:string;

  constructor(id_korisnik:string, id_prevoznik:string, tekst:string){
      this.id_korisnik=id_korisnik;
      this.id_prevoznik=id_prevoznik;
      this.tekst=tekst;
  }
}
