import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Usuario } from 'src/app/model/Usuario';
import { CategoriaService } from 'src/app/service/categoria.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  apaga: number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  busca: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == "") {
      Swal.fire('Sua sessão expirou')

      this.router.navigate(["/home"])
    }

    this.findAllCategorias()

    let id = this.route.snapshot.params["id"]

  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) =>{
      this.listaCategoria = resp
    })
  }

  findByIdCategoria(id: number) {
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;
    })
  }

  cadastrar(){
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp
      Swal.fire({
        icon: 'success',
        title: 'Feito!',
        text: 'Categoria cadastrada com sucesso!'
      })
      this.findAllCategorias()
      this.categoria = new Categoria()
    })

    this.router.navigateByUrl('/user-edit', { skipLocationChange: true }).then(() =>{
      this.router.navigate(["/categoria-edit"])
 })
  }

  atualizar(){
    this.categoriaService.putCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp
      Swal.fire({
        icon: 'success',
        title: 'Feito!',
        text: 'Categoria atualizada com sucesso!'
      })
      this.findAllCategorias()
    })

    this.router.navigateByUrl('/user-edit', { skipLocationChange: true }).then(() =>{
      this.router.navigate(["/categoria-edit"])
 })
  }

  apagar(idCategoria: number){
    this.categoriaService.deleteCategoria(idCategoria).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Feito!',
        text: 'Categoria apagada com sucesso!'
      })
      
      this.findAllCategorias()
    })

    this.router.navigateByUrl('/user-edit', { skipLocationChange: true }).then(() =>{
    this.router.navigate(["/categoria-edit"])
 })
  }



}
