import { ProdutoService } from './../service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from './../model/Produto';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produto: Produto = new Produto()
  carrinho: Produto[]
  quant: number
  vParcial: number

  constructor(private router: Router, private aRoute: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    window.scroll(0, 0)
    let id = this.aRoute.snapshot.params['id']
    this.findProdById(id)
    this.quant = 1
    this.vParcial = this.produto.valor
  }


  findProdById(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
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
      alert("É preciso estar logado para comprar")
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

      alert("Produto adicionado com sucesso!")

      this.router.navigate(['/carrinho'])
    }
  }
}
