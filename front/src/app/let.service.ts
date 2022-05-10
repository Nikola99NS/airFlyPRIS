import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Komentar } from './Komentar';

import {Let} from './Let';
import { Prevoznik } from './Prevoznik';

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

  prevoznici(): Observable<any> {
    return this.httpClient.get<Prevoznik[]>(this.BACKEND_BASE + "/api/let/prevoznici")
  }

  unesiNoviLet(noviLet:object): Observable<any>{
    return this.httpClient.post(this.BACKEND_BASE + "/api/let/dodaj-let", noviLet)
  }

  getPrevoznik(prevoznikId : string):Observable<any>{

    let params = new HttpParams().set("prevoznik", prevoznikId);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.get<Prevoznik>(this.BACKEND_BASE + "/api/let/prevoznik", {
      headers,
      params
    })
  }

  getKomentari(idPrevoznik : string){
    let params = new HttpParams().set("id_prevoznik", idPrevoznik);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.httpClient.get<Komentar[]>(this.BACKEND_BASE + "/api/let/komentari", {
      headers,
      params
    })
  }

  addComment(idPrevoznik:string,korisnik:string|null, komentar:string):Observable<any>{
    return this.httpClient.post(this.BACKEND_BASE+"/api/let/komentar",{
      id_prevoznik:idPrevoznik,
      korisnik:korisnik,
      komentar:komentar
    })
  }

  addOcena(idPrevoznik:string, rate:number, user : any):Observable<any>{
    return this.httpClient.post(this.BACKEND_BASE+"/api/let/ocena",{
      id_prevoznik:idPrevoznik,
      ocena:rate,
      user : user
    })
  }

  
}

