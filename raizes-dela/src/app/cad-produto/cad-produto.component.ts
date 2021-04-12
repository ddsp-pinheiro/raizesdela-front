import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../model/Categoria';
import { Produto } from './../model/Produto';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';
import { ProdutoService } from '../service/produto.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css']
})

export class CadProdutoComponent implements OnInit {

  produto: Produto = new Produto

  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria:number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  cep: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService,
    private http: HttpClient,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == "") {
      Swal.fire('Sua sessão expirou')

      this.router.navigate(["/home"])
    }

    this.getAllCategoria()
  }

  getAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria=resp
    })
  }

  findCategoriaById(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria = resp
    })
  }

  cadProduto() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario

    if(this.produto == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha os campos corretamente!'
      })
    } else {
      this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=> {
        this.produto = resp
          Swal.fire({
            icon: 'success',
            title: 'Boa!',
            text: 'Produto cadastrado com sucesso!'
          })
          this.produto = new Produto
          this.router.navigate(['/meus-produtos'])
      })
    }
  }

  mascaraCEP(){
    this.cep =this.cep.replace(/\D/g,"")                 //Remove tudo o que não é dígito
    this.cep =this.cep.replace(/(\d{5})(\d)/,"$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    return this.cep
  }
}
