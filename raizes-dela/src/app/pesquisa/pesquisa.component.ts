import { ProdutoService } from 'src/app/service/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  busca: string
  produto: Produto = new Produto()
  listaProd : Produto[]

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    window.scroll(0, 0)
    this.busca = this.route.snapshot.params["busca"]
    this.pesquisa()
  }

  pesquisa() {
    this.produtoService.getByNameProduto(this.busca).subscribe((resp: Produto[]) => {
      this.listaProd = resp
    })
  }
}
