import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  produto: Produto = new Produto

  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria:number

  user: Usuario = new Usuario()
  nome = environment.nome
  token = environment.token
  id = environment.id
  tipoUsuario = environment.tipoVendedor
  busca: string

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.getAllCategoria()    
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

  refresh2(idCat: number){
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>{
         this.router.navigate(['/categoria',idCat])
    })
  }

  refresh(){
      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>{
           this.router.navigate(["/pesquisa",this.busca])
      })
  }

  sair() {
    this.router.navigate(["/home"])
    environment.token = ''
    environment.nome = ''
    environment.id = 0
  }

}
