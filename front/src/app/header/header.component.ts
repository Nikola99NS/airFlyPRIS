import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("trenutniUser")
    localStorage.removeItem("adminT")
    this.router.navigate(['login'])
  }

  prevoznici(){
    this.router.navigate(['prevoznici'])

  }

  dobrodosli(){
    this.router.navigate(['pocetna'])
  }
}