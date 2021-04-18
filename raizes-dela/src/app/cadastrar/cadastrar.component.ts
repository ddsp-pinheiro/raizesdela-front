
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
  nomeValido: boolean = false;
  emailValido: boolean = false;
  senhaValida: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  validacao(condicao: boolean, event:any){
    let valid = false;
    if(condicao){
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    }else{
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
      valid = true;
    }
    return valid;
  }

  validaNome(event: any){
    this.nomeValido = this.validacao(event.target.value.length < 3, event);
  }

  validaEmail(event: any){
    this.emailValido = this.validacao(event.target.value.indexOf('@') == -1 || event.target.value.indexOf('.') == -1, event);
  }

  validaSenha(event: any){
    this.senhaValida = this.validacao(event.target.value.length < 6 || event.target.value.length > 8, event)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
    this.senhaValida = this.validacao(this.confirmarSenha != this.user.senha, event)
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
