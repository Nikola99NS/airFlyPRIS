import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LetService } from '../let.service';
import { Prevoznik } from '../Prevoznik';

@Component({
  selector: 'app-prevoznici',
  templateUrl: './prevoznici.component.html',
  styleUrls: ['./prevoznici.component.css']
})
export class PrevozniciComponent implements OnInit {

public prevoznik: Prevoznik | undefined;
public prevoznici: Prevoznik[] | null = null;

  constructor( private letService : LetService,private router: Router) { }

  ngOnInit(): void {
    this.letService.prevoznici().subscribe(resp => {
      this.prevoznici = resp;
    })
  }

  klikni(id:string){
    console.log(id)
    this.router.navigate(['prevoznik',id])
  }

}