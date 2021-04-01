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
  produto: Produto
  carrinho: Produto[]
  quant: number
  vParcial:number
  vTotal:number

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    this.quant=1
    this.parcial()
    this.vTotal = 0
    this.total()
  }

  process(value: number){
    value+= this.quant;
    if(value < 1){
      this.quant= 1;
    }else{
      this.quant= value;
    }
  }
  parcial(){
    this.vParcial = 2 * this.quant
    return this.vParcial
  }

  total(){
    this.vTotal=0
      this.vTotal=this.vParcial+this.vTotal
    }

  }
