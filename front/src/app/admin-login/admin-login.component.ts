import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegLogServiceService } from '../reg-log-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  usernameAdmin:string='';
  passwordAdmin:string='';


  constructor(private service:RegLogServiceService,private router: Router) { }

  ngOnInit(): void {
  }

  loginForAdmin(){
    this.service.adminLogin(this.usernameAdmin, this.passwordAdmin).subscribe(resp =>{
      alert(resp.msg)
      localStorage.setItem("token", resp.token),
      localStorage.setItem("adminT","adminovToken")
      localStorage.setItem("trenutniUser", JSON.stringify(resp.trenutniUser.username)),
      this.router.navigate(['pocetna'])
    })
  }

}
