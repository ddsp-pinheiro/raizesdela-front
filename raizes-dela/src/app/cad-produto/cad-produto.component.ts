import { Usuario } from './../model/Usuario';
import { Categoria } from './../model/Categoria';
import { ProdutoService } from './../service/produto.service.service';
import { Produto } from './../model/Produto';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css']
})
export class CadProdutoComponent implements OnInit {

  token= environment
  produto: Produto = new Produto
  categoria: Categoria = new Categoria
  usuario: Usuario = new Usuario
  listaProduto: Produto[]
  idCategoria: number
  idUser: number



  constructor(
    private authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService,
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  getAllProdutos() {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) => {
      this.listaProduto = resp
    })
  }

  cadProduto(){
        this.categoria.id = this.idCategoria
        this.produto.categoria = this.categoria

        this.usuario.id = this.idUser
        this.produto.usuario = this.usuario

        this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
          this.produto = resp
          alert("Produto realizada com sucesso!")
          this.produto = new Produto()
        })

  }
}
