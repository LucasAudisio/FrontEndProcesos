import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http-client-mio.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  nombre: String;
  contrasenia: String;
  error: String;

  constructor(private http: HttpService, private router: Router) {
    this.nombre = "";
    this.contrasenia = "";
    this.error = "";
  }

  registrarse() {
    const bodyData = {
      name: this.nombre,
      password: this.contrasenia
    }

    this.http.registrarse(bodyData).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(["/login"]);
      },
      error: (error) => {
        console.log(error)
        this.error = error.error;
      }
    });
  }

  ngOnInit() {
    if (localStorage["clave"] != undefined) {
      this.router.navigate(["/"]);
    }
  }

  volverMenu() {
    this.router.navigate(["/"]);
  }
}
