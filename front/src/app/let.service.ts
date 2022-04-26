import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {Let} from './Let';

@Injectable({
  providedIn: 'root'
})
export class LetService {

  constructor(private httpClient: HttpClient) { }

  BACKEND_BASE = "http://localhost:3000"

  pretrazi(polazak: string, dolazak: string, datum: string): Observable<any> {
    let params = new HttpParams().set("polazak", polazak).set("dolazak", dolazak).set("datum", datum);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.get<Let[]>(this.BACKEND_BASE + "/api/let/pretrazi", {
      headers,
      params
    })
  }

  rezervisi(username:string | null, id:string): Observable<any>{
    return this.httpClient.post(this.BACKEND_BASE + "/api/let/rezervisi", {
      username: username,
      let_id:id
     })
  }

  vratiPrevoznika(ime:string): Observable<any>{

    let params = new HttpParams().set("prevoznik", ime);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    
    return this.httpClient.get<Let>(this.BACKEND_BASE+"/api/let/prevoznik",{
      headers,
      params
    })
  }

  //todo
  unesiNoviLet(){

  }
}
