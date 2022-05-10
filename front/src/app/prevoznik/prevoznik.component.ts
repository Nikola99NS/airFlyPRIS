import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Komentar } from '../Komentar';
import { LetService } from '../let.service';
import { Prevoznik } from '../Prevoznik';

@Component({
  selector: 'app-prevoznik',
  templateUrl: './prevoznik.component.html',
  styleUrls: ['./prevoznik.component.css']
})
export class PrevoznikComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service : LetService) { }

  prevoznikId : string= '';
  public prevoznik : Prevoznik | null = null ;
  public comments : Komentar[] =[];
  public user : string | null = null;
  // public tekst : string = '';
  public komentar : string ='';

  public currentRate : number=0;
  public str: any ;

  public prosecnaOcena : number = 0;

  ngOnInit(): void {
    this.user = localStorage.getItem("trenutniUser");

    this.route.params.subscribe((params: Params) => this.prevoznikId = params['id']);

    this.service.getPrevoznik(this.prevoznikId).subscribe(resp => {
      this.prevoznik = resp; 
      
    })

    this.service.getKomentari(this.prevoznikId).subscribe(resp=>{
      this.comments=resp
    })

  
  }

  dodajKom(){
    if(localStorage.getItem("trenutniUser")!=null){

      const user:string | null= localStorage.getItem("trenutniUser");
      const komentar = user + " : " + this.komentar
      this.service.addComment(this.prevoznikId,user, komentar).subscribe(resp => {
        alert(resp.msg)
      })
     
    }else{
      alert("Niste se ulogovali")
    }
    this.ngOnInit()
  }

  oceni(idPrevoznik : string){
    if(this.currentRate!=0 && localStorage.getItem("trenutniUser")!=null){
      var user = localStorage.getItem("trenutniUser")
      this.service.addOcena(idPrevoznik, this.currentRate, user).subscribe(resp=>{
        this.prosecnaOcena = resp.ocena;
        console.log(this.prosecnaOcena)
        alert(resp.msg)
      })
    }else{
      alert("Niste se ulogovali")
    }
    this.ngOnInit()
  }
 
}
