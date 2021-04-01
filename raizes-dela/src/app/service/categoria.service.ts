import { Categoria } from './../model/Categoria';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http:HttpClient
  ) {}

  token={
    headers: new HttpHeaders().set("Authorization",environment.token)
  }

  gelAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>("http://localhost:8080/categoria", this.token)
  }

  getByIdCategoria(id: number):Observable<Categoria>{
    return this.http.get<Categoria>(`http://localhost:8080/categoria/${id}`, this.token)
  }

  postCategoria(categoria:Categoria): Observable<Categoria>{
    return this.http.post<Categoria>("http://localhost:8080/categoria", categoria, this.token)
  }

  editCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>("http://localhost:8080/categoria", categoria, this.token)
  }

  deleteCategoria(id: number){
    return this.http.delete(`http://localhost:8080/categoria/${id}`, this.token)
  }

}
