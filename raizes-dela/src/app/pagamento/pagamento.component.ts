import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  //formulario endereco
  endereco = document.querySelector("#endereco")
  cidade = document.querySelector ("#cidade")
  cep = document.querySelector("#cep")
  //formulario cartao
   nomeCartao= document.querySelector("#nomeCartao")
   noCartao= document.querySelector("#noCartao")
   cpf= document.querySelector("#cpf")
   cvv= document.querySelector("#cvv")
  //validações
  parte1OK = false
  parte2Ok = false

  constructor(private router:Router) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  //  validaBoleto(){
  //     if(this.endereco.value == "" || this.cidade != null || this.cep != null)
  //     {
  //       this.parte1OK = true

  //     } else{
  //       alert("Preencha corretamente o formulário")
  //     }
  // }

  // validaCartao(){
  //     if(this.parte1OK == false ){
  //       alert("Preencha corretamente o endereço")
  //     } else if(this.nomeCartao == null || this.cpf == null || this.noCartao == null || this.cvv == null) {
  //       alert("Preencha corretamente os dados do cartão")
  //     } else{
  //       this.parte2Ok = true
  //       alert("Pagamento realizado com sucesso! Aguarde email de confirmação.")
  //       this.router.navigate (['/home'])
  //     }
  // }

  sucesso(){
    alert("Pagamento realizado com sucesso! Aguarde email de confirmação.")
    this.router.navigate (['/home'])
  }
}
