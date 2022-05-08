import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Let } from '../Let';
import { LetService } from '../let.service';
import { AuthService } from '../shared/auth.service'
import { Prevoznik } from '../Prevoznik';


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {

  // myImage:string='assets/images/sky.webp'

  constructor(public auth: AuthService, private letService : LetService, private router: Router){  }

  ngOnInit(): void{
    this.letService.prevoznici().subscribe(resp => {
      this.prevozniciList = resp
    })
  }


  public user: string | null = localStorage.getItem("trenutniUser")

  public datum: string='';
  public polazni: string='';
  public dolazni: string='';
  public letovi: Let[] | null = null;

  public polazniAdmin: string='';
  public dolazniAdmin: string='';
  public prevozniciList: Prevoznik[] = [];
  public prevoznik : string='';
  tipovi = ['svakodnevno','jednokratno','radniDan'];
  public selected:string ='';
  public datumAdmin: string='';
  public cenaEkonomska : number=0;
  public cenaBiznis : number=0;
  public vremePolaska : string='';
  public vremeDolaska : string='';
  public slobodnaMesta: number=0;

  public p : boolean=false;

  public popust: boolean=false;
  public popustMsg: string= '';


  login(){
    this.router.navigate(['login'])
  }

  pretrazi() {
    this.p=true;
    this.letService.pretrazi(this.polazni, this.dolazni, this.datum).subscribe(resp => {
      this.letovi = resp;
    })
  }

  rezervisi(id:string){


    this.popust = false;
    this.popustMsg = "";

    const user:string | null = localStorage.getItem("trenutniUser");
    if(localStorage.getItem("trenutniUser")){
      this.letService.rezervisi(user, id).subscribe(resp => {

        if(resp.popust == "da"){
          this.popust = true;
          this.popustMsg = resp.msg;
        }

        alert(resp.msg)

      })
    }else{
      alert("Morate se ulogovati")
      this.router.navigate(['login'])
    }


  }

  prevoznici(){
    this.router.navigate(['prevoznici'])

  }

  unesiNoviLet(){
    let noviLet = {
      polazak: this.polazniAdmin,
      dolazak: this.dolazniAdmin,
      datum: this.datumAdmin,
      vreme_polaska: this.vremePolaska,
      vreme_dolaska: this.vremeDolaska,
      tip: this.selected,
      prevoznik: this.prevoznik,
      cena_ekonomska: this.cenaEkonomska,
      cena_biznis: this.cenaBiznis,
      slobodna_mesta: this.slobodnaMesta
    }

    this.letService.unesiNoviLet(noviLet).subscribe(resp => {
      alert(resp.msg)
    })

  }
}
