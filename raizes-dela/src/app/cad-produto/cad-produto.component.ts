import { Produto } from './../model/Produto';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css']
})
export class CadProdutoComponent implements OnInit {

  produto: Produto = new Produto


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  cadProduto() {
    if(this.produto == null) {
      alert("Preencha os campos corretamento")
    } else {
      this.authService.cadProduto(this.produto).subscribe((resp: Produto)=> {
        this.produto = resp
          this.router.navigate(['/cad-Produto'])
          alert ('Produto cadastrado com sucesso!')
      })
    }
  }
}
