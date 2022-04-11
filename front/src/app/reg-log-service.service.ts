import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegLogServiceService {

  constructor(private httpClient: HttpClient) { }

  BACKEND_BASE = "http://localhost:3000"

  register(username: string, password: number): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/register", {
      username: username,
      password:password
     })
  }

  login(username: string, password: number): Observable<any> {
    return this.httpClient.post(this.BACKEND_BASE + "/api/user/login", {
      username: username,
      password: password
    }).pipe(map((resp: any) => {
      return resp;
    }))
  }
}
