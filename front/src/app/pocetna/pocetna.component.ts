import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Let } from '../Let';
import { LetService } from '../let.service';


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {


  constructor(private letService : LetService, private router: Router){  }


  headers = ["Polazak - dolazak", "datum", "vreme polaska", "vreme dolaska"]

  public user: string | null = localStorage.getItem("trenutniUser")

  public datum: string='';
  public polazni: string='';
  public dolazni: string='';
  public letovi: Let[] | null = null;

  public polazniAdmin: string='';
  public dolazniAdmin: string='';
  tipovi = [
    { id: 1, name: "svakodnevno" },
    { id: 2, name: "jednokratno" },
    { id: 3, name: "radnimDanima" }
  ];


  public p : boolean=false;

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

    this.letService.rezervisi(user, id).subscribe(resp => {
      alert(resp.msg)
    })

  }

  getToken(){
    return localStorage.getItem("adminT")
  }

  prevoznici(){
    this.router.navigate(['prevoznici'])

  }

  unesiNoviLet(){
    console.log(this.polazniAdmin)
  }
}
