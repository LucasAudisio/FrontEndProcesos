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

  //atributos para postComponente
  idPiezaPadrePost: Number;
  idComponenteNuevoPost: Number;
  respuestaNuevoComponentePiezaPost: String;

  // atributos para getComponentes
  idComponentesPieza: Number;
  respuestaComponentesPieza: String;
  componentesLista: Array <{
    id: Number,
    material: String,
    peso: String
  }>;
  getComponentes: boolean;

  // atributos para deleteComponente
  idPiezaPadreDelete: Number;
  idComponenteNuevoDelete: Number;
  respuestaNuevoComponentePiezaDelete: String;

  constructor(private http: HttpService, private router: Router) {
    this.errorPiezasLista = "";
    this.piezasLista = [];
    this.getPiezas = false;

    this.respuestaGetPieza = "";
    this.idGetPieza = Number(undefined);

    this.pesoPostPieza = "";
    this.materialPostPieza = "";
    this.respuestaPostPieza = "";

    this.idDeletePieza = Number(undefined);
    this.respuestaDeletePieza = "";

    this.idPatchPieza = Number(undefined);
    this.materialPatchPieza = "";
    this.pesoPatchPieza = "";
    this.respuestaPatchPieza = "";

    this.idPiezaPadrePost = Number(undefined);
    this.idComponenteNuevoPost = Number(undefined);
    this.respuestaNuevoComponentePiezaPost = "";

    this.idComponentesPieza = Number(undefined);
    this.respuestaComponentesPieza = "";
    this.componentesLista = [];
    this.getComponentes = false;

    this.idPiezaPadreDelete = Number(undefined);
    this.idComponenteNuevoDelete = Number(undefined);
    this.respuestaNuevoComponentePiezaDelete = "";
  }

  getAllPiezas() {
    if (localStorage["clave"] == undefined) {
      this.errorPiezasLista = "inicie sesion para acceder a estos datos"
    }
    else {
      this.http.getPiezas().subscribe({
        next: (data) => {
          this.errorPiezasLista= "";
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
    else if (this.idGetPieza.valueOf() <= 0 || isNaN(this.idGetPieza.valueOf())) {
      this.respuestaGetPieza = "id invalido";
    }
    else {
      this.http.existePieza(this.idGetPieza).subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          if (respuesta) {
            this.http.getPieza(this.idGetPieza).subscribe({
              next: (data) => {
                const id: number = JSON.parse(JSON.stringify(data)).data.id;
                const material: string = JSON.parse(JSON.stringify(data)).data.material;
                const peso: string = JSON.parse(JSON.stringify(data)).data.peso;

                this.respuestaGetPieza = "id: " + String(id) + " / material: " + material + " / peso: " + peso;
              },
              error: (error) => {
                this.respuestaGetPieza = error.error;
              }
            });
          }
          else {
            this.respuestaGetPieza = "No existe esa pieza"
          }
        },
        error: (error) => {
          this.respuestaGetPieza = error.error;
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
    else if (this.idDeletePieza.valueOf() <= 0 || isNaN(this.idDeletePieza.valueOf())) {
      this.respuestaDeletePieza = "id invalido";
    }
    else {
      this.http.existePieza(this.idDeletePieza.valueOf()).subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this.http.deletePieza(this.idDeletePieza).subscribe({
              next: (data) => {
                this.respuestaDeletePieza = "Se borro existosamente";
              },
              error: (error) => {
                this.respuestaDeletePieza = error.error;
              }
            });
          }
          else {
            this.respuestaDeletePieza = "No existe esta pieza";
          }
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }

  patchPieza() {
    if (localStorage["clave"] == undefined) {
      this.respuestaPatchPieza = "inicie sesion para acceder a estos datos"
    }
    else if (this.idPatchPieza.valueOf() <= 0 || isNaN(this.idPatchPieza.valueOf())) {
      this.respuestaPatchPieza = "id invalido";
    }
    else {
      this.http.existePieza(this.idPatchPieza.valueOf()).subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this.http.getPieza(this.idPatchPieza).subscribe({
              next: (data) => {
                if (this.pesoPatchPieza == "") this.pesoPatchPieza = JSON.parse(JSON.stringify(data)).data.peso;
                if (this.materialPatchPieza == "") this.materialPatchPieza = JSON.parse(JSON.stringify(data)).data.material;
                this.http.patchPieza(this.idPatchPieza, this.pesoPatchPieza, this.materialPatchPieza).subscribe({
                  next: (data) => {
                    this.pesoPatchPieza = "";
                    this.materialPatchPieza = "";

                    this.respuestaPatchPieza = "Se modifico exitosamente"
                  },
                  error: (error) => {
                    this.respuestaPatchPieza = error.error;
                  }
                });
              },
              error: (error) => {
                this.respuestaPatchPieza = error.error;
              }
            });
          }
          else {
            this.respuestaPatchPieza = "No existe esa pieza";
          }
        },
        error: (error) => {
          this.respuestaPatchPieza = error.error;
        }
      });
    }
  }

  getAllComponentes() {
    if (localStorage["clave"] == undefined) {
      this.respuestaComponentesPieza = "inicie sesion para acceder a estos datos"
    }
    else if (this.idComponentesPieza.valueOf() <= 0 || isNaN(this.idComponentesPieza.valueOf())) {
      this.respuestaComponentesPieza = "id invalido";
    }
    else {
      this.http.existePieza(this.idComponentesPieza.valueOf()).subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this.http.getComponentes(this.idComponentesPieza).subscribe({
              next: (data) => {
                console.log(data)
                this.componentesLista = JSON.parse(JSON.stringify(data)).data;
                this.getComponentes = true;
                console.log(this.componentesLista);
                this.respuestaComponentesPieza = "";
              },
              error: (error) => {
                this.respuestaComponentesPieza = error.error;
              }
            });
          }
          else {
            this.respuestaComponentesPieza = "No existe esa pieza";
          }
        },
        error: (error) => {
          this.respuestaComponentesPieza = error.error;
        }
      });
    }
  }

  postComponente() {
    if (localStorage["clave"] == undefined) {
      this.respuestaNuevoComponentePiezaPost = "inicie sesion para acceder a estos datos"
    }
    else if (this.idPiezaPadrePost.valueOf() <= 0 || this.idComponenteNuevoPost.valueOf() <= 0
      || isNaN(this.idPiezaPadrePost.valueOf()) || isNaN(this.idComponenteNuevoPost.valueOf())) {
      this.respuestaNuevoComponentePiezaPost = "id(s) invalido";
    }
    else {
      this.http.existePieza(this.idPiezaPadrePost.valueOf()).subscribe({
        next: (respuesta) => {
          if(respuesta){
            this.http.existePieza(this.idComponenteNuevoPost.valueOf()).subscribe({
              next: (respuesta) => {
                if(respuesta){
                  this.http.postComponentes(this.idPiezaPadrePost, this.idComponenteNuevoPost).subscribe({
                    next: (data) => {
                      this.respuestaNuevoComponentePiezaPost = "Se añadio exitosamente";
                    },
                    error: (error) => {
                      console.log(":v")
                      this.respuestaNuevoComponentePiezaPost = error.error;
                    }
                  });
                }
                else{
                  this.respuestaNuevoComponentePiezaPost = "No existe ese componente hijo";
                }
              },
              error: (error) => {
                this.respuestaNuevoComponentePiezaPost = error.error;
              }
            });
          }
          else{
            this.respuestaNuevoComponentePiezaPost = "No existe ese componente padre";
          }
        },
        error: (error) => {
          this.respuestaNuevoComponentePiezaPost = error.error;
        }
      });
    }
  }

  deleteComponent(){
    if (localStorage["clave"] == undefined) {
      this.respuestaNuevoComponentePiezaDelete = "inicie sesion para acceder a estos datos"
    }
    else if (this.idPiezaPadreDelete.valueOf() <= 0 || this.idComponenteNuevoDelete.valueOf() <= 0 
    || isNaN(this.idPiezaPadreDelete.valueOf()) || isNaN(this.idComponenteNuevoDelete.valueOf())) {
      this.respuestaNuevoComponentePiezaDelete = "id(s) invalido";
    }
    else {
      this.http.existePieza(this.idPiezaPadreDelete.valueOf()).subscribe({
        next: (respuesta) => {
          if(respuesta){
            this.http.existePieza(this.idComponenteNuevoDelete.valueOf()).subscribe({
              next: (respuesta) => {
                if(respuesta){
                  this.http.deleteComponentes(this.idPiezaPadreDelete, this.idComponenteNuevoDelete).subscribe({
                    next: (data) => {
                      this.respuestaNuevoComponentePiezaDelete = "Se elimino exitosamente";
                    },
                    error: (error) => {
                      this.respuestaNuevoComponentePiezaDelete = error.error;
                    }
                  });
                }
                else{
                  this.respuestaNuevoComponentePiezaDelete = "No existe ese componente hijo";
                }
              },
              error: (error) => {
                this.respuestaNuevoComponentePiezaDelete = error.error;
              }
            });
          }
          else{
            this.respuestaNuevoComponentePiezaDelete = "No existe ese componente padre";
          }
        },
        error: (error) => {
          this.respuestaNuevoComponentePiezaDelete = error.error;
        }
      });
    }
  }

  volverMenu() {
    this.router.navigate(["/"]);
  }
}
