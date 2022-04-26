import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegLogServiceService } from '../reg-log-service.service';
// import { RegLoginService } from '../reg-login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string='';
  password: string='';
  message: string='';
  i : boolean=false;

  userAdmin:string='';
  passwordAdmin:string='';
  
  constructor(private service:RegLogServiceService,private router: Router) { }
  
  ngOnInit(): void {
  }
  
  getUsername():string{
      return this.username
  }
  
  login() {
    // console.log(this.username)
    this.service.login(this.username, this.password).subscribe(resp =>{
      alert(resp.msg)
      localStorage.setItem("token", resp.token),
      localStorage.setItem("trenutniUser", JSON.stringify(resp.trenutniUser.username)),
      // console.log(localStorage.getItem("trenutniUser"))     
      this.router.navigate(['pocetna'])
    })
  }

  forAdmin() {
    this.i = true
  }

  loginForAdmin(){
    if(this.userAdmin=="Pero" && this.passwordAdmin=='123'){
      localStorage.setItem("adminT","adminovToken")
      this.router.navigate(['pocetna'])
      alert("You are admin")

    }else{
      alert("You are not admin")
    }
  }

  unesiNoviLet(){
    
  }
}



  