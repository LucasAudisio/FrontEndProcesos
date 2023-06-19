import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

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

  existePieza(id: number): Observable<boolean> {
    return this.http.get(this.urlApi + "/piezas", { headers: {Authorization: localStorage["clave"]}})
      .pipe(
        map((data: any) => {
          for(let i = 0; i < JSON.parse(JSON.stringify(data)).data.length; i++) {
            if(JSON.parse(JSON.stringify(data)).data[i].id == id) {
              return true;
            }
          }
          return false;
        }),
        catchError((error: any) => {
          console.log(error);
          return of(false);
        })
      );
  }

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

  getComponentes(id: Number){
    return this.http.get(this.urlApi + "/piezas/" + String(id) + "/componentes", {headers: {Authorization: localStorage["clave"]}});
  }

  postComponentes(idPadre: Number, idHijo: Number){
    return this.http.post(this.urlApi + "/piezas/" + String(idPadre) + "/componentes/" + String(idHijo), {} ,{headers: {Authorization: localStorage["clave"]}});
  }

  deleteComponentes(idPadre: Number, idHijo: Number){
    return this.http.delete(this.urlApi + "/piezas/" + String(idPadre) + "/componentes/" + String(idHijo),{headers: {Authorization: localStorage["clave"]}});
  }

  // metodos procesos
  existeProceso(id: number): Observable<boolean> {
    return this.http.get(this.urlApi + "/procesos", { headers: {Authorization: localStorage["clave"]}})
      .pipe(
        map((data: any) => {
          for(let i = 0; i < JSON.parse(JSON.stringify(data)).data.length; i++) {
            if(JSON.parse(JSON.stringify(data)).data[i].id == id) {
              return true;
            }
          }
          return false;
        }),
        catchError((error: any) => {
          console.log(error);
          return of(false);
        })
      );
  }

  getProcesos(){
    return this.http.get(this.urlApi + "/procesos", {headers: {Authorization: localStorage["clave"]}});
  }

  getProceso(id: Number){
    return this.http.get(this.urlApi + "/procesos/" + String(id), {headers: {Authorization: localStorage["clave"]}});
  }

  postProceso(idPieza: Number, tipo: String){
    const cuerpo: Object = {
      id_pieza_salida: idPieza,
      tipo: tipo
    };
    return this.http.post(this.urlApi + "/procesos", cuerpo, {headers: {Authorization: localStorage["clave"]}})
  }

  deleteProceso(id: Number){
    return this.http.delete(this.urlApi + "/procesos/" + id, {headers: {Authorization: localStorage["clave"]}})
  }

  getEntradas(id: Number){
    return this.http.get(this.urlApi + "/procesos/" + String(id) + "/piezasEntrada", {headers: {Authorization: localStorage["clave"]}});
  }

  getSalida(id: Number){
    return this.http.get(this.urlApi + "/procesos/" + String(id) + "/piezasSalida", {headers: {Authorization: localStorage["clave"]}});
  }
}
