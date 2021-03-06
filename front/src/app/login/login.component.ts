import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegLogServiceService } from '../reg-log-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string='';
  password: string='';
  message: string='';

  constructor(private service:RegLogServiceService,private router: Router) { }

  ngOnInit(): void {
  }

  getUsername():string{
      return this.username
  }

  login() {
    this.service.login(this.username, this.password).subscribe(resp =>{
      alert(resp.msg)
      localStorage.setItem("token", resp.token),
      localStorage.setItem("trenutniUser", JSON.stringify(resp.trenutniUser.username)),
      this.router.navigate(['pocetna'])
    })
  }

  unesiNoviLet(){

  }
}



