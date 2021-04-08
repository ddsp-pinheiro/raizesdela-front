import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css']
})
export class MeusProdutosComponent implements OnInit {

  user: Usuario = new Usuario();
  idUsuario = environment.id;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0);
    if (environment.token == "") {

      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Sua sessão expirou!'
      })


      this.router.navigate(["/home"]);
    }

    this.findByIdUser();
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: Usuario)=>{
      this.user = resp;
    });
  }

}
