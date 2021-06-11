import { CategoriaService } from './../service/categoria.service';
import { Categoria } from './../model/Categoria';
import { Produto } from './../model/Produto';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';
import { ProdutoService } from '../service/produto.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css']
})

export class CadProdutoComponent implements OnInit {

  produto: Produto = new Produto

  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria: number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  cep: string
  nomeValido = false;
  descricaoValida = false;
  fotoValida = false;
  cidadeValida = false;
  cepValido = false;
  quantValida = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private categoriaService: CategoriaService,
    private http: HttpClient,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == "") {
      Swal.fire('Sua sessão expirou')

      this.router.navigate(["/home"])
    }

    this.getAllCategoria()
  }

  // validacoes

  validacao(condicao: boolean, event: any) {
    let valid = false;
    if (condicao) {
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    } else {
      event.target.classList.remove("is-invalid");
      event.target.classList.add("is-valid");
      valid = true;
    }
    return valid;
  }

  validaNome(event: any) {
    this.nomeValido = this.validacao(event.target.value.length < 3, event);
  }

  validaDescricao(event: any) {
    this.descricaoValida = this.validacao(event.target.value.length < 10 || event.target.value.length > 200, event);
  }

  validaFoto(event: any) {
    let regex = /\.(jpe?g|png)$/i
    this.fotoValida = this.validacao(!regex.test(event.target.value) && event.target.value.length != 0, event)
  }

  validaQuant(event: any) {
    this.quantValida = this.validacao(event.target.value.length < 1, event);
  }

  validaCidade(event: any) {
    this.cidadeValida = this.validacao(event.target.value.length < 4, event);
  }

  validaCep(event: any) {
    this.cepValido = this.validacao(event.target.value.length < 9 || event.target.value.maxlength > 9, event);
  }

  mascaraCEP() {
    this.cep = this.cep.replace(/\D/g, "")                 //Remove tudo o que não é dígito
    this.cep = this.cep.replace(/(\d{5})(\d)/, "$1-$2")    //Coloca hífen entre o quarto e o quinto dígitos
    return this.cep
  }

  // validacoes

  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  findCategoriaById() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria = resp
    })
  }

  cadProduto() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      Swal.fire({
        icon: 'success',
        title: 'Boa!',
        text: 'Produto cadastrado com sucesso!'
      })
      this.produto = new Produto
      this.router.navigate(['/meus-produtos'])
    }, erro => {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha os campos corretamente!',
      })
    })

  }

}
