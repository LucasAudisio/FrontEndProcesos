import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http-client-mio.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent {
  // atributos getAllProcesos
  errorProcesosLista: String;
  procesosLista: Array<{
    id: Number,
    id_pieza_salida: Number,
    tipo: String
  }>;
  getProcesos: boolean;

  // atributo getProceso
  respuestaGetProceso: String;
  idGetProceso: Number;

  // atributo postProceso
  idPiezaPostProceso: Number;
  tipoPostPieza: String;
  respuestaPostProceso: String;

  // atributos deleteProceso
  respuestaDeleteProceso: String;
  idDeleteProceso: Number;

  // atributos getEntradas
  idProcesosEntradas: Number;
  respuestaGetEntradas: String;
  EntradasLista: Array<{
    id: Number,
    id_pieza_salida: Number,
    tipo: String
  }>;
  getIfEntradas: boolean;

  // atributos getSalida
  idProcesosSalida: Number;
  respuestaGetSalida: String;

  constructor(private router: Router, private http: HttpService) {
    this.errorProcesosLista = "";
    this.procesosLista = [];
    this.getProcesos = false;

    this.respuestaGetProceso = "";
    this.idGetProceso = Number(undefined);

    this.idPiezaPostProceso = Number(undefined);
    this.tipoPostPieza = "";
    this.respuestaPostProceso = "";

    this.respuestaDeleteProceso = "";
    this.idDeleteProceso = Number(undefined);

    this.idProcesosEntradas = Number(undefined);
    this.respuestaGetEntradas = "";
    this.EntradasLista = [];
    this.getIfEntradas = false;

    this.idProcesosSalida = Number(undefined);
    this.respuestaGetSalida = ""; 
  }

  getAllProcesos() {
    if (localStorage["clave"] == undefined) {
      this.errorProcesosLista = "inicie sesion para acceder a estos datos"
    }
    else {
      this.http.getProcesos().subscribe({
        next: (data) => {
          console.log(data);
          console.log(JSON.parse(JSON.stringify(data)).data[0])
          this.procesosLista = JSON.parse(JSON.stringify(data)).data;
          this.getProcesos = true;
          this.errorProcesosLista = "";
        },
        error: (error) => {
          this.errorProcesosLista = error.error;
        }
      });
    }
  }

  getProceso() {
    if (localStorage["clave"] == undefined) {
      this.respuestaGetProceso = "inicie sesion para acceder a estos datos"
    }
    else if (this.idGetProceso.valueOf() <= 0 || isNaN(this.idGetProceso.valueOf())) {
      this.respuestaGetProceso = "id invalido";
    }
    else {
      this.http.existeProceso(this.idGetProceso.valueOf()).subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          if (respuesta) {
            this.http.getProceso(this.idGetProceso).subscribe({
              next: (data) => {
                const id: number = JSON.parse(JSON.stringify(data)).data.id;
                const piezaSalida: string = JSON.parse(JSON.stringify(data)).data.id_pieza_salida;
                const tipo: string = JSON.parse(JSON.stringify(data)).data.tipo;

                this.respuestaGetProceso = "id: " + String(id) + " / id pieza salida: " + piezaSalida + " / tipo: " + tipo;
              },
              error: (error) => {
                this.respuestaGetProceso = error.error;
              }
            });
          }
          else {
            this.respuestaGetProceso = "No existe ese proceso"
          }
        },
        error: (error) => {
          this.respuestaGetProceso = error.error;
        }
      });
    }
  }

  postProceso() {
    if (localStorage["clave"] == undefined) {
      this.respuestaPostProceso = "inicie sesion para acceder a estos datos"
    }
    else if (this.idPiezaPostProceso.valueOf() <= 0 || isNaN(this.idPiezaPostProceso.valueOf())) {
      this.respuestaPostProceso = "id invalido";
    }
    else {
      this.http.existeProceso(this.idPiezaPostProceso.valueOf()).subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this.http.postProceso(this.idPiezaPostProceso, this.tipoPostPieza).subscribe({
              next: (data) => {
                this.respuestaPostProceso = "Se subio correctamente el proceso con id: " + JSON.parse(JSON.stringify(data)).ProcesoID;
              },
              error: (error) => {
                this.respuestaPostProceso = error.error;
              }
            });
          }
          else {
            this.respuestaPostProceso = "Esta pieza de salida no existe";
          }
        },
        error: (error) => {
          this.respuestaPostProceso = error.error;
        }
      });
    }
  }

  deleteProceso(){
    if (localStorage["clave"] == undefined) {
      this.respuestaDeleteProceso = "inicie sesion para acceder a estos datos"
    }
    else if (this.idDeleteProceso.valueOf() <= 0 || isNaN(this.idDeleteProceso.valueOf())) {
      this.respuestaDeleteProceso = "id invalido";
    }
    else {
      this.http.existeProceso(this.idDeleteProceso.valueOf()).subscribe({
        next: (respuesta) => {
          if(respuesta){
            this.http.deleteProceso(this.idDeleteProceso).subscribe({
              next: (data) => {
                this.respuestaDeleteProceso = "Se borro correctamente";
              },
              error: (error) => {
                this.respuestaDeleteProceso = error.error;
              }
            });
          }
          else{
            this.respuestaDeleteProceso = "No existe este proceso";
          }
        },
        error: (error) => {
          this.respuestaDeleteProceso = error.error;
        }
      });
    }
  }

  getEntradas(){
    if (localStorage["clave"] == undefined) {
      this.respuestaGetEntradas = "inicie sesion para acceder a estos datos"
    }
    else if (this.idProcesosEntradas.valueOf() <= 0 || isNaN(this.idProcesosEntradas.valueOf())) {
      this.respuestaGetEntradas = "id invalido";
    }
    else{
      this.http.existeProceso(this.idProcesosEntradas.valueOf()).subscribe({
        next: (respuesta) => {
          if(respuesta){
            this.http.getEntradas(this.idProcesosEntradas).subscribe({
              next: (data) => {
                console.log(data);
                console.log(JSON.parse(JSON.stringify(data)).data[0])
                this.EntradasLista = JSON.parse(JSON.stringify(data)).data;
                this.getIfEntradas = true;
                this.respuestaGetEntradas = "";
              },
              error: (error) => {
                this.respuestaGetEntradas = error.error;
              }
            });
          }
          else {
            this.respuestaGetEntradas = "Este proceso no existe";
          }
        },
        error: (error) => {
          this.respuestaGetEntradas = error.error;
        }
      });
    }
  }

  getSalida(){
    if (localStorage["clave"] == undefined) {
      this.respuestaGetSalida = "inicie sesion para acceder a estos datos"
    }
    else if (this.idProcesosSalida.valueOf() <= 0 || isNaN(this.idProcesosSalida.valueOf())) {
      this.respuestaGetSalida = "id invalido";
    }
    else{
      this.http.existeProceso(this.idProcesosSalida.valueOf()).subscribe({
        next: (respuesta) => {
          if(respuesta){
            this.http.getSalida(this.idProcesosSalida).subscribe({
              next: (data) => {
                console.log(data);
                const id: number = JSON.parse(JSON.stringify(data)).data.id;
                const material: string = JSON.parse(JSON.stringify(data)).data.material;
                const peso: string = JSON.parse(JSON.stringify(data)).data.peso;

                this.respuestaGetSalida = "id: " + String(id) + " / material: " + material + " / peso: " + peso;
              },
              error: (error) => {
                this.respuestaGetSalida = error.error;
              }
            });
          }
          else{
            this.respuestaGetSalida = "No existe ese proceso";
          }
        },
        error: (error) => {
          this.respuestaGetSalida = error.error;
        }
      });
    }
  }

  volverMenu() {
    this.router.navigate(["/"]);
  }
}
