import { Component, OnInit } from '@angular/core';
import { LoginDTO } from 'src/models/login-dto';
import { UsuariosService } from '../../../services/usuarios.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public imgLogo:string = 'https://static.vecteezy.com/system/resources/previews/014/611/290/original/financial-piggy-bank-ideas-for-saving-money-for-the-future-png.png'

  protected user:LoginDTO = {
    nombreUsuario: '',
    contrasena: ''
  };

  constructor(private usuarioService:UsuariosService,
              private alert:AlertService,
              private router:Router
  ) { }

  ngOnInit() {
  }

  logIn(){
    this.usuarioService.logIn(this.user).subscribe(res => {
      localStorage.setItem('token',res.token)
      this.router.navigate(['app','tabs','tab1'])

    }, err => {
      this.alert.mostrarMensaje('Error al iniciar sesión','El usuario o la contraseña propocionada son incorrectas')
    })
  }

}
