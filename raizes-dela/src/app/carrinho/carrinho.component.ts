import { Produto } from './../model/Produto';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  produto: Produto = new Produto
  carrinho: Produto[]
  vParcial: number
  vTotal: number
  vazio: string
  quant: number
  carrinhoOb = {
    valor: 0
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.exibirCarrinho()
    this.total()
  }

  exibirCarrinho() {
    const localS = localStorage['carrinho']
    if (localS.length > 0) {
      this.carrinho = localS ? JSON.parse(localS) : []
    } else {
      this.vazio = "O Carrinho está vazio"
      this.vTotal = 0
    }
  }


  // userOb = {
  //   nome: '',
  //   user: '',
  //   senha: ''
  // }

  // let users = []
  // users = JSON.parse(localStorage.getItem('lista_users'))

  // users.forEach((i) => {

  //     userOb = {
  //       nome: i.nome,
  //       user: i.user,
  //       senha: i.senha
  //     }
  // })


  total() {
    this.vTotal = 0
    let dadosProd = []
    dadosProd = JSON.parse(localStorage.getItem('carrinho') || '{}')
    dadosProd.forEach((i) => {
      this.carrinhoOb = {
        valor: i.valorParcial
      }


      this.vTotal = this.carrinhoOb.valor + this.vTotal
    })
    return this.vTotal.toFixed(2)
  }

}
