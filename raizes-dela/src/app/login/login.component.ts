import { environment } from './../../environments/environment.prod';
import { UsuarioLogin } from './../model/UsuarioLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: UsuarioLogin = new UsuarioLogin

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp: UsuarioLogin) => {
      this.userLogin = resp
      environment.id = this.userLogin.id
      environment.nome = this.userLogin.nome
      environment.token = this.userLogin.token
      environment.tipoVendedor = this.userLogin.tipoVendedor

      this.router.navigate (['/home'])
    },error=>{
      if( error.status == 500 ){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Usuário ou senha incorretos!'
        })

    }}
    )
  }

}
