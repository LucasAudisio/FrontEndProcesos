import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  mostrarIniciar: boolean;
  mostrarRegistrar: boolean;
  mostrarCerrar: boolean;

  constructor(private router: Router){
    this.mostrarIniciar = true;
    this.mostrarRegistrar = true;
    this.mostrarCerrar = false;
  }

  ngOnInit(){
    if(localStorage["clave"] != undefined){
      this.mostrarIniciar = false;
      this.mostrarRegistrar = false;
      this.mostrarCerrar = true;
    }
  }

  redirectLogin(){
    this.router.navigate(["/login"]);
  }

  redirectRegistrarse(){
    this.router.navigate(["/registrarse"]);
  }

  piezas(){
    this.router.navigate(["/piezas"]);
  }

  cerrarSesion(){
    localStorage.removeItem("clave");
    this.mostrarIniciar = true;
    this.mostrarRegistrar = true;
    this.mostrarCerrar = false;
  }
}
