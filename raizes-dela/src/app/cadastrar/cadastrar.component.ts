
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  user: Usuario = new Usuario
  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    window.scroll(0, 0)
  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }


  tipoUser(event: any) {
    this.user.tipoVendedor = event.target.value
  }


  cadastrar() {
    if (this.user.senha != this.confirmarSenha) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'As senhas não estão iguais!'
      })
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp;

        this.router.navigate(['/login'])
        Swal.fire({
          icon: 'success',
          title: 'Boa!',
          text: 'Usuário cadastrado com sucesso!'
        })
      }, erro => {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Usuário já existe, por favor escolha outro.',
          })
      })
    }
  }
}
