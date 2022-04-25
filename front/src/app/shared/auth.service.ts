import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isLoggedIn(){
    console.log(localStorage.getItem("adminT"))
    return (!!localStorage.getItem("token") || !!localStorage.getItem("adminT"))
  }
}
