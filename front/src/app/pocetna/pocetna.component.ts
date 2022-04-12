import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { timeoutWith } from 'rxjs/operators';
// import { Let } from '../Let';
// import { LetService } from '../services/let.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {


  // constructor(private letService : LetService,private router: Router){

  // }
  constructor(private router: Router){

     }


  headers = ["Polazak - dolazak", "datum", "vreme polaska", "vreme dolaska"]

  public spojeno:string=''
  
  // public user: string = localStorage.getItem("trenutniUser")

  public datum:string='';
  public polazni:string='';
  public dolazni:string='';
  // public letovi:Observable<Let[]>=''


  // pretrazi() {
  //   this.spojeno = this.polazni + " - " + this.dolazni;
  //   this.letovi = this.letService.getLet();

  // }
  
  login(){
    this.router.navigate(['login'])
    console.log('nesto')
  }

  logout(){
    this.router.navigate(['logout'])
  }

  // rezervisi(id:string,l:string){

  //   const user = localStorage.getItem("trenutniUser");
  //   this.letService.rezervisi(id,l,user);
  //   console.log(id, l , user)

  // }
}
