import { HttpClient, HttpHeaders } from  '@angular/common/http';
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

  // metodos piezas
  getPiezas(){
    return this.http.get(this.urlApi + "/piezas", {headers: {Authorization: localStorage["clave"]}});
  }

  getPieza(id: Number){
    return this.http.get(this.urlApi + "/piezas/" + String(id), {headers: {Authorization: localStorage["clave"]}});
  }

  postPieza(peso: String, material: String){
    const cuerpo: Object = {
      peso: peso,
      material: material
    };
    return this.http.post(this.urlApi + "/piezas", cuerpo, {headers: {Authorization: localStorage["clave"]}})
  }

  deletePieza(id: Number){
    return this.http.delete(this.urlApi + "/piezas/" + id, {headers: {Authorization: localStorage["clave"]}})
  }

  patchPieza(id: Number, peso: String, material: String){
    const cuerpo: Object = {
      id: id,
      peso: peso,
      material: material
    };
  return this.http.patch(this.urlApi + "/piezas", cuerpo, {headers: {Authorization: localStorage["clave"]}});
  }
}
