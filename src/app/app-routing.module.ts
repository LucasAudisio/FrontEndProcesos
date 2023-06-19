import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PiezasComponent } from './piezas/piezas.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ProcesosComponent } from './procesos/procesos.component';

const routes: Routes = [
  {
    path: "registrarse",
    component: RegistrarComponent,
    title: "registrar"
  },
  {
    path: "login",
    component: LoginComponent,
    title: "login"
  },
  {
    path: "",
    component: InicioComponent,
    title: "inicio"
  },
  {
    path: "piezas",
    component: PiezasComponent,
    title: "piezas"
  },
  {
    path: "procesos",
    component: ProcesosComponent,
    title: "procesos"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
