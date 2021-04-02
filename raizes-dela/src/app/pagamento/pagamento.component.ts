import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  //formulario endereco
  endereco: string
  cidade: string
  cep: number
  //formulario cartao
   nomeCartao: string
   noCartao: number
   cpf: number
   cvv: number

  constructor(private router:Router) { }

  ngOnInit(){
    window.scroll(0,0)
  }

   validaBoleto(){
      if(this.endereco != null && this.cidade != null && this.cep != null){
        this.router.navigate(['/home'])
        alert("Boleto gerado com sucesso! Aguarde email de confirmação da compra.")
        window.open("https://drive.google.com/file/d/1Jj76x1dCv4n4cTyD0Idtzpleea2VvFjh/view")


      } else{
        alert("Preencha corretamente o formulário")
      }
  }

  validaCartao(){
    if(this.endereco == null || this.cidade == null || this.cep == null){
        alert("Preencha corretamente o endereço")
      } else if(this.nomeCartao == null || this.cpf == null || this.noCartao == null || this.cvv == null) {
        alert("Preencha corretamente os dados do cartão")
      } else{
        alert("Pagamento realizado com sucesso! Aguarde email de confirmação da compra.")
        this.router.navigate (['/home'])
      }
  }

  sucesso(){
    alert("Pagamento realizado com sucesso! Aguarde email de confirmação da compra.")
    this.router.navigate (['/home'])
  }
}
