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

  images2=["https://images.pexels.com/photos/164357/pexels-photo-164357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","https://images.pexels.com/photos/2180457/pexels-photo-2180457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]


  constructor(public auth: AuthService, private letService : LetService, private router: Router){  }

  ngOnInit(): void{
    this.letService.prevoznici().subscribe(resp => {
      this.prevozniciList = resp
    })
  }

  public tipAviona : string[] | null=null;


  public user: string | null = localStorage.getItem("trenutniUser")

  public datum: string='';
  public polazni: string='';
  public dolazni: string='';
  public letovi: Let[] | null = null;

  public najpovoljnijiLetovi: Let[] | null=null;

  public najboljiPrevoznici: Prevoznik[] | null=null;


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

  
  klikni(id:string){
    console.log(id)
    this.router.navigate(['prevoznik',id])
  }

  slide1(id:number){
    this.letService.najpovoljnijiLetovi(id).subscribe(resp => {
      this.najpovoljnijiLetovi = resp;
    })

    this.letovi=this.najpovoljnijiLetovi;
    this.p=true;
  }

  slide2(){
    this.letService.najboljiPrevoznici().subscribe(resp => {
      // this.najboljiPrevoznici = resp;
      this.router.navigate(['prevoznik',resp])
    })
    
  }

  tip(id:string){
    this.letService.vratiTip(id).subscribe(resp=>{
      this.tipAviona=resp;
      
    })
  }
}