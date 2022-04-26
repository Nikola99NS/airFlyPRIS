import { Component, OnInit } from '@angular/core';
import { Prevoznik } from './prevoznik';

@Component({
  selector: 'app-prevoznici',
  templateUrl: './prevoznici.component.html',
  styleUrls: ['./prevoznici.component.css']
})
export class PrevozniciComponent implements OnInit {

public prevoznik: Prevoznik | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
