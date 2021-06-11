import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  produto: Produto = new Produto

  cep: string

  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria:number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == "") {
      this.router.navigate(["/home"])
    }

    let id = this.route.snapshot.params["id"]
    this.findByIdProduto(id)
    this.findAllCategorias()
  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto)=>{
      this.produto = resp;
    });
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria=resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria = resp
    })
  }

  mascaraCEP(){
    this.cep =this.cep.replace(/\D/g,"")                 //Remove tudo o que não é dígito
    this.cep =this.cep.replace(/(\d{5})(\d)/,"$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    return this.cep
  }

  atualizar() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario

    if(this.produto == null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha os campos corretamente'
      })

    }else {
      this.produtoService.putProduto(this.produto).subscribe((resp: Produto)=> {
        this.produto = resp
          Swal.fire({
            icon: 'success',
            title: 'Boa!',
            text: 'Produto editado com sucesso!'
          })

          this.router.navigate(["/meus-produtos"])
      })
    }
  }
}
