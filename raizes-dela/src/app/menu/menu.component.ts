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
import Swal from 'sweetalert2';

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
  tipoAdministrador = environment.tipoAdministrador
  busca: string

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
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
    environment.token = ''
    environment.nome = ''
    environment.id = 0
    environment.imagem = '',
    environment.tipoVendedor = false,
    environment.tipoAdministrador = false
    this.router.navigate(["/home"])
    Swal.fire('Sessão finalizada')
  }

}
