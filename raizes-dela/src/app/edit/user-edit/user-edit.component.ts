import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipoUsuario: boolean

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/home'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    if(this.tipoUsuario == undefined){
      this.user.tipoVendedor = false
    } else {
      this.user.tipoVendedor = this.tipoUsuario
    }

    console.log(this.user)
    if(this.user.senha != this.confirmarSenha){
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'As senhas estão incorretas'
      })

    } else {
      this.authService.cadastrar(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        this.router.navigate(['/home'])
        Swal.fire({
          icon: 'success',
          title: 'Boa!',
          text: 'Usuário atualizado com sucesso, faça o login novamente'
        })
        environment.token = ''
        environment.nome = ''
        environment.id = 0
        this.router.navigate(['/login'])
      })
    }
  }



}
