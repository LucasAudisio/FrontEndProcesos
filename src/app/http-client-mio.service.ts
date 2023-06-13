import { HttpClient } from  '@angular/common/http';
import { Injectable } from  '@angular/core';

@Injectable({
providedIn:  'root'
})

export class HttpService {

  private urlApi = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registrarse(cuerpo: any) {
    return this.http.post(this.urlApi + "/usuarios/register", cuerpo);
  }

  login(cuerpo: any){
    return this.http.post(this.urlApi + "/usuarios/login", cuerpo);
  }
}
