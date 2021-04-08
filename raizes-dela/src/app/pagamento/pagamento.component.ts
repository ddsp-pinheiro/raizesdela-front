import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  //formulario endereco
  endereco: string
  cidade: string
  cep: string
  //formulario cartao
   nomeCartao: string
   noCartao: string
   cpf: string
   cvv: string
   //total
   total:number

  constructor(
    private router:Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    window.scroll(0,0)
    this.total= this.route.snapshot.params['total']
  }

   validaBoleto(){
      if(this.endereco != null && this.cidade != null && this.cep != null){
        this.router.navigate(['/home'])
        Swal.fire({
          icon: 'success',
          title: 'Boa!',
          text: 'Boleto gerado com sucesso! Aguarde o email de confirmação da compra.'
        })
        window.open("https://drive.google.com/file/d/1Jj76x1dCv4n4cTyD0Idtzpleea2VvFjh/view")
        localStorage.clear()

      } else{
        Swal.fire({
          icon: 'warning',
          title: 'Atenção',
          text: 'Preencha o formulário corretamente!'
        })
      }
  }

  validaCartao(){
    if(this.endereco == null || this.cidade == null || this.cep == null){
        Swal.fire({
          icon: 'warning',
          title: 'Atenção',
          text: 'Preencha o endereço corretamente.'
        })
      } else if(this.nomeCartao == null || this.cpf == null || this.noCartao == null || this.cvv == null) {
        Swal.fire({
          icon: 'warning',
          title: 'Atenção',
          text: 'Preencha corretamente os dados do cartão.'
        })
      } else{
        Swal.fire({
          icon: 'success',
          title: 'Boa!',
          text: 'Pagamento realizado com sucesso! Aguarde o email de confirmação da compra.'
        })
        this.router.navigate (['/home'])
      }
  }

  mascaraCEP(){
    this.cep =this.cep.replace(/\D/g,"")                 //Remove tudo o que não é dígito
    this.cep =this.cep.replace(/(\d{5})(\d)/,"$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    return this.cep
  }

  mascaraCPF(){
    this.cpf =this.cpf.replace(/\D/g,"")                 //Remove tudo o que não é dígito
    this.cpf =this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d)/,"$1.$2.$3-$4")
    return this.cpf
  }
  mascaraNo(){
    this.noCartao = this.noCartao.replace(/\D/g,"")
    this.noCartao = this.noCartao.replace(/(\d{4})(\d{4})(\d{4})(\d)/,"$1 $2 $3 $4")
    return this.noCartao
  }

  mascaraCVV(){
    this.cvv =this.cvv.replace(/\D/g,"")  //Remove tudo o que não é dígito
    return this.cvv
  }
}
