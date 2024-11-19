import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { mail, clave } = this.loginForm.value;
      this.usuariosService.login(mail, clave).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          if (response.status === 'success') {
            // redirigir al usuario y proporcionarle un token
/*             this.router.navigate(['dashboard']); */
            localStorage.setItem('token', response.token);
            this.fakeloading();
          } else {
            console.error('Credenciales invalidas:', response.message);
            this.error();
            this.loginForm.reset();
          }
        },
        error => {
          console.error('Login error:', error);
        }
      );
    }
  }



 
  // Método para mostrar un error
  error() {
    this._snackBar.open('Usuario o contraseña inválidos', '', {
      duration: 3000,
    });
  }

  fakeloading() {

    this.loading = true;
    setTimeout(() => {

      //redireccionamos al dashboard
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}