import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  user: Usuario = new Usuario();
  idUsuario = environment.id;

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number

  produto: Produto = new Produto
  listaProduto: Produto[]
  idProduto: number

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    window.scroll(0,0);
    
    let id = this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }


  findByIdCategoria(id: number){
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;
    })
  }

  findByIdProduto(){
    this.produtoService.getByIdProduto(this.idProduto).subscribe((resp: Produto) => {
      this.produto = resp;
    })
  }

}
