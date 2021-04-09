import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
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

  carrinho: Produto[]
  quant: number
  vParcial: number

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router, 
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    
    this.quant = 1
    this.vParcial = this.produto.valor
    
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

  process(value: number) {
    value += this.quant;
    if (value < 1) {
      this.quant = 1;
    } else if (value >= (this.produto.estoque - 1)) {
      this.quant = (this.produto.estoque - 1);
    } else {
      this.quant = value;
    }
  }

  parcial() {
    this.vParcial = this.produto.valor * this.quant
    return this.vParcial
  }

  addCarrinho() {
    if (environment.token == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'É preciso estar logado para comprar'
      })

      this.router.navigate(["/login"])
    } else {
      this.parcial()
      this.carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]')

      this.carrinho.push(
        {
          id: this.produto.id,
          nome: this.produto.nome,
          imagem: this.produto.imagem,
          estoque: this.produto.estoque,
          valor: this.produto.valor,
          categoria: this.produto.categoria,
          descricao: this.produto.descricao,
          usuario: this.produto.usuario,
          quantidade: this.quant,
          valorParcial: this.vParcial
        })
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho))
      Swal.fire({
        icon: 'success',
        title: 'Boa!',
        text: 'Produto adicionado com sucesso!'
      })

      this.router.navigate(['/carrinho'])
    }
  }
}
