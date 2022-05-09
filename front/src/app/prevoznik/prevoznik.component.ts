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
  public komentari : Komentar[] | null = null;
  public user : string | null = null;
  // public tekst : string = '';
  public komentar : string ='';

  public currentRate : number=0;
  public str: any ;


  ngOnInit(): void {
    this.user = localStorage.getItem("trenutniUser");

    this.route.params.subscribe((params: Params) => this.prevoznikId = params['id']);

    this.service.getPrevoznik(this.prevoznikId).subscribe(resp => {
      this.prevoznik = resp; 
    })

    this.service.getKomentari(this.prevoznikId).subscribe(resp=>{
      console.log(resp)
      this.komentari = resp;
    })

  
  }

  dodajKom(){
    if(localStorage.getItem("trenutniUser")!=null){
      const user:string | null= localStorage.getItem("trenutniUser");
      this.service.addComment(this.prevoznikId,user, this.komentar).subscribe(resp => {
        alert(resp.msg)
      })
     
    }else{
      alert("Niste se ulogovali")
    }
  }

  oceni(idPrevoznik : string){
    if(this.currentRate!=0){
       this.str=this.currentRate + '';

      this.service.addOcena(idPrevoznik, this.str).subscribe(resp=>{
        alert(resp.msg)
      })
    }
  }
 
}
