import { environment } from './../../environments/environment.prod';
import { Usuario } from './../model/Usuario';
import { ProdutoService } from './../service/produto.service.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css']
})
export class MeusProdutosComponent implements OnInit {

  usuario:Usuario = new Usuario()
  idUser=environment.id
  produto:Produto = new Produto()
  listaDeProdutos:Produto[]

  constructor(
    private produtoService:ProdutoService
  ) { }

  ngOnInit() {
  }

  getAllProdutos(){
    this.produtoService.getAllProduto().subscribe((resp : Produto[]) => {
      this.listaDeProdutos= resp
    })
  }

}
