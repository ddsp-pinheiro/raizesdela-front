import { ProdutoService } from './../service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from './../model/Produto';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Usuario } from '../model/Usuario';
import { Comentario } from '../model/Comentario';
import { ComentarioService } from '../service/comentario.service';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  produto: Produto = new Produto()
  carrinho: Produto[]
  quant: number
  vParcial: number
  usuario: Usuario = new Usuario()
  idUser = environment.id

  comentario: Comentario = new Comentario()
  listaComentarios: Comentario[]

  constructor(
    private router: Router, 
    private aRoute: ActivatedRoute, 
    private produtoService: ProdutoService,
    private comentarioService: ComentarioService) { }

  ngOnInit() {
    window.scroll(0, 0)
    let id = this.aRoute.snapshot.params['id']
    this.findProdById(id)
    this.findAllComentarios()
    this.quant = 1
    this.vParcial = this.produto.valor
  }


  findProdById(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  process(value: number) {
    value += this.quant;
    if (value < 1) {
      this.quant = 1;
    } else if (value >= (this.produto.estoque - 1)) {
      this.quant = (this.produto.estoque - 1);
    } else {
      this.quant = value;
    }
  }

  parcial() {
    this.vParcial = this.produto.valor * this.quant
    return this.vParcial
  }

  addCarrinho() {
    if (environment.token == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'É preciso estar logado para comprar'
      })

      this.router.navigate(["/login"])
    } else {
      this.parcial()
      this.carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]')

      this.carrinho.push(
        {
          id: this.produto.id,
          nome: this.produto.nome,
          imagem: this.produto.imagem,
          estoque: this.produto.estoque,
          valor: this.produto.valor,
          categoria: this.produto.categoria,
          descricao: this.produto.descricao,
          usuario: this.produto.usuario,
          quantidade: this.quant,
          valorParcial: this.vParcial,
          comentario: this.produto.comentario
        })
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho))
      Swal.fire({
        icon: 'success',
        title: 'Boa!',
        text: 'Produto adicionado com sucesso!'
      })

      this.router.navigate(['/carrinho'])
    }
  }

  comentar(id: number){

    this.usuario.id = this.idUser;
    this.comentario.usuario = this.usuario;

    this.produto.id = id;
    this.comentario.produto = this.produto;

    this.comentarioService.postComent(this.comentario).subscribe((resp: Comentario) => {
      this.comentario = resp
      Swal.fire({
        icon: 'success',
        title: 'Boa!',
        text:'Comentário inserido com sucesso!'});
      this.comentario = new Comentario();
      this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() =>{
      this.router.navigate(["/produto",this.produto.id])
   })
    }, err => {
      console.log(this.comentario)
    })
  }

  findAllComentarios(){
    this.comentarioService.getAllComents().subscribe((resp: Comentario[])=>{
      this.listaComentarios = resp
    })
  }
}

