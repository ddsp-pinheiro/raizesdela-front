import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../model/Categoria';
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
  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria:number

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.getAllCategoria()
    this.findCategoriaById()
  }

  getAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria=resp
    })
  }

  findCategoriaById(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria = resp
    })
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
