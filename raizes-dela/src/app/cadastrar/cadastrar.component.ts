import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  user: Usuario = new Usuario
  confirmarSenha: string
  
  //tipoUsuario: boolean
  constructor(
    private authService: AuthService,
    private router: Router
    //private alert
  ) { }
  ngOnInit() {
    window.scroll(0,0)
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }
  // tipoUser(event: any) {
  //   this.tipoUser = event.target.value
  // }
  cadastrar() {
    //this.user.tipoVendedor = this.tipoUsuario
    if(this.user.senha != this.confirmarSenha) {
      alert("As senhas estão incorretas.")
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario)=> {
        this.user = resp
        if(this.user == null) {
          alert ('Usuário já existe, por favor escolha outro.')
        } else {
          this.router.navigate(['/login'])
          alert ('Usuário cadastrado com sucesso!')
        }
      })
    }
  }
}

