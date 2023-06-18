import { Component } from '@angular/core';
import { HttpService } from '../http-client-mio.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-piezas',
  templateUrl: './piezas.component.html',
  styleUrls: ['./piezas.component.css']
})
export class PiezasComponent {
  // atributos para getPiezas
  errorPiezasLista: String;
  piezasLista: Array<{
    id: number,
    material: string,
    peso: number
  }>;
  getPiezas: boolean;

  // atributos para getPieza
  respuestaGetPieza: String
  idGetPieza: number;

  // atributos para postPieza
  pesoPostPieza: String;
  materialPostPieza: String;
  respuestaPostPieza: String;

  // atributos para deletePieza
  idDeletePieza: Number;
  respuestaDeletePieza: String;

  // atributos para patchPieza
  idPatchPieza: Number;
  materialPatchPieza: String;
  pesoPatchPieza: String;
  respuestaPatchPieza: String;

  constructor(private http: HttpService, private router: Router) {
    this.errorPiezasLista = "";
    this.piezasLista = [];
    this.getPiezas = false;

    this.respuestaGetPieza = "";
    this.idGetPieza = 0;

    this.pesoPostPieza = "";
    this.materialPostPieza = "";
    this.respuestaPostPieza = "";

    this.idDeletePieza = 0;
    this.respuestaDeletePieza = "";

    this.idPatchPieza = 0;
    this.materialPatchPieza = "";
    this.pesoPatchPieza = "";
    this.respuestaPatchPieza = "";
  }

  getAllPiezas() {
    if (localStorage["clave"] == undefined) {
      this.errorPiezasLista = "inicie sesion para acceder a estos datos"
    }
    else {
      this.http.getPiezas().subscribe({
        next: (data) => {
          console.log(data);
          console.log(JSON.parse(JSON.stringify(data)).data[0])
          this.piezasLista = JSON.parse(JSON.stringify(data)).data;
          this.getPiezas = true;
        },
        error: (error) => {
          this.errorPiezasLista = error.error;
        }
      });
    }
  }

  getPieza() {
    if (localStorage["clave"] == undefined) {
      this.respuestaGetPieza = "inicie sesion para acceder a estos datos"
    }
    else if(this.idGetPieza.valueOf() <= 0){
      this.respuestaGetPieza = "id invalido";
    }
    else {
      this.http.getPieza(this.idGetPieza).subscribe({
        next: (data) => {
          const id: number = JSON.parse(JSON.stringify(data)).data.id;
          const material: string = JSON.parse(JSON.stringify(data)).data.material;
          const peso: string = JSON.parse(JSON.stringify(data)).data.peso;

          this.respuestaGetPieza = "id: " + String(id) + " / material: " + material + " / peso: " + peso;
        },
        error: (error) => {
          this.respuestaGetPieza = "La pieza probablemente no existe y/o haya crasheado el BackEnd";
        }
      });
    }
  }

  postPieza() {
    if (localStorage["clave"] == undefined) {
      this.respuestaPostPieza = "inicie sesion para acceder a estos datos"
    }
    else {
      this.http.postPieza(this.pesoPostPieza, this.materialPostPieza).subscribe({
        next: (data) => {
          this.respuestaPostPieza = "Se subio correctamente la pieza con id: " + JSON.parse(JSON.stringify(data)).data;
        },
        error: (error) => {
          this.respuestaPostPieza = error.error;
        }
      });
    }
  }

  deletePieza() {
    if (localStorage["clave"] == undefined) {
      this.respuestaDeletePieza = "inicie sesion para acceder a estos datos"
    }
    else if(this.idDeletePieza.valueOf() <= 0){
      this.respuestaDeletePieza = "id invalido";
    }
    else {
      this.http.deletePieza(this.idDeletePieza).subscribe({
        next: (data) => {
          // la api no diferencia entre pieza inexistente y pieza borrada
          this.respuestaDeletePieza = "En caso de que exista esa pieza, se borro";
        },
        error: (error) => {
          this.respuestaDeletePieza = error.error;
        }
      });
    }
  }

  patchPieza() {
    if (localStorage["clave"] == undefined) {
      this.respuestaPatchPieza = "inicie sesion para acceder a estos datos"
    }
    else if(this.idPatchPieza.valueOf() <= 0){
      this.respuestaPatchPieza = "id invalido";
    }
    else {
      this.http.getPieza(this.idPatchPieza).subscribe({
        next: (data) => {
          if (this.pesoPatchPieza == "") this.pesoPatchPieza = JSON.parse(JSON.stringify(data)).data.peso;
          if (this.materialPatchPieza == "") this.materialPatchPieza = JSON.parse(JSON.stringify(data)).data.material;
          this.http.patchPieza(this.idPatchPieza, this.pesoPatchPieza, this.materialPatchPieza).subscribe({
            next: (data) => {
              // la api no diferencia entre pieza inexistente y pieza modificada
              this.respuestaPatchPieza = "En caso de que exista esa pieza, se modifico"
            },
            error: (error) => {
              this.respuestaPatchPieza = error.error;
            }
          });
        },
        error: (error) => {
          this.respuestaPatchPieza = "La pieza probablemente no existe y/o haya crasheado el BackEnd";
        }
      });
    }
  }

  volverMenu(){
    this.router.navigate(["/"]);
  }
}
