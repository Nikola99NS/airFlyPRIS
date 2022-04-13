import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
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


  login(){
    this.router.navigate(['login'])
    console.log('nesto')
  }

  logout(){
    this.router.navigate(['logout'])
  }

  pretrazi() {
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
}
