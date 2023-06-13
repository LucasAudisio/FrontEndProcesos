import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http-client-mio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string;
  contrasenia: string;
  error: String;

  constructor(private http: HttpService, private router: Router){
    this.nombre = "";
    this.contrasenia = "";
    this.error = "";
  }

  login(){
    const bodyData = {
      name: this.nombre,
      password: this.contrasenia
    }
    this.http.login(bodyData).subscribe({
      next: (data) => {
        console.log(data)
        localStorage["clave"] = JSON.parse(JSON.stringify(data)).token;
        this.router.navigate(["/"]);
      },
      error: (error) => {
        this.error = error.error;
      }
    })
  }
}
