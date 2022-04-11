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
  password: number=0;
  
  
  constructor(private service:RegLogServiceService,private router: Router) { }
  
  ngOnInit(): void {
  }
  
  getUsername():string{
      return this.username
  }
  
  login() {
    console.log(this.username)
    this.service.login(this.username, this.password).subscribe(resp =>{
      localStorage.setItem("token", resp.token),
      localStorage.setItem("trenutniUser", JSON.stringify(resp.trenutniUser.username)),
      
      // console.log(this.username)
      alert(resp.msg),
      this.router.navigate(['pocetna'])
    })
    // console.log(this.username)
    // this.router.navigate(['pocetna'])

  }
  }
  