import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Let } from '../Let';
import { LetService } from '../let.service';
import { Prevoznik } from '../prevoznici/prevoznik';


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {

  // myImage:string='assets/images/sky.webp'

  constructor(private letService : LetService, private router: Router){  }


  headers = ["Polazak - dolazak", "datum", "vreme polaska", "vreme dolaska"]

  public user: string | null = localStorage.getItem("trenutniUser")

  public datum: string='';
  public polazni: string='';
  public dolazni: string='';
  public letovi: Let[] | null = null;

  public prev!: Prevoznik;

  public polazniAdmin: string='';
  public dolazniAdmin: string='';
  public prevoznik : string='';
  tipovi = ['svakodnevno','jednokratno','radniDan'];
  klase = ['biznis','ekonomska'];
  public selected:string ='';
  public selected2: string='';
  public datum2: string='';
  public cena : number=0;
  public vreme : string='';
  public p : boolean=false;


   noviLet: any = [ ];

  login(){
    this.router.navigate(['login'])
    console.log('nesto')
  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("trenutniUser")
    localStorage.removeItem("adminT")
    this.router.navigate(['login'])
  }

  pretrazi() {
    this.p=true;
    this.letService.pretrazi(this.polazni, this.dolazni, this.datum).subscribe(resp => {
      this.letovi = resp;
    })
  }

  rezervisi(id:string){

    const user:string | null = localStorage.getItem("trenutniUser");
    if(localStorage.getItem("trenutniUser")){
      this.letService.rezervisi(user, id).subscribe(resp => {
        alert(resp.msg)
      })
    }else{
      alert("Morate se ulogovati")
      this.router.navigate(['login'])
    }
   

  }

  getToken(){
    return localStorage.getItem("adminT")
  }

  prevoznici(){
    this.router.navigate(['prevoznici'])

  }

  unesiNoviLet(){
    this.noviLet.push(this.polazniAdmin)
    this.noviLet.push(this.dolazniAdmin)
    this.noviLet.push(this.datum2)
    this.noviLet.push(this.vreme)
    this.noviLet.push(this.selected)
    this.noviLet.push(this.selected2)
    this.noviLet.push(this.prevoznik)

    //pozvatiServis

    // console.log(this.noviLet)
  }

  getPrevoznik(p:string){
    console.log(p)
    this.letService.vratiPrevoznika(p).subscribe(resp=>{
      this.router.navigate(['prevoznici'],resp)
      // console.log(resp.opis)

    })
  }
}
