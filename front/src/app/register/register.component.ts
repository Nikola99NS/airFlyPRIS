import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegLogServiceService } from '../reg-log-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: RegLogServiceService,private router: Router) { }
  
  public username: string = '';
  public password: number =0;
  
  ngOnInit(): void {
  }
  
  register() {
    console.log(this.username + this.password)
    this.service.register(this.username, this.password).subscribe(resp =>{
      alert(resp.msg),
      this.router.navigate(['login']);
    })
  
  }
  
  submitForm(){
    const message=`my name is ${this.username}. my email is ${this.password}`
    alert(message)
    
  }
  
  }