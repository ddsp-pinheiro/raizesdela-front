import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../model/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllProduto(): Observable <Produto[]>{
    return this.http.get<Produto[]>("http://localhost:8080/produto",this.token)
  }

  getByIdProduto(id:number): Observable <Produto>{
    return this.http.get<Produto>(`http://localhost:8080/produto/${id}`, this.token)
  }

  getByNameProduto(nome:string): Observable <Produto>{
    return this.http.get<Produto>(`http://localhost:8080/produto/nome/${nome}`, this.token)
  }

  postProduto(produto:Produto):Observable<Produto>{
    return this.http.post<Produto>("http://localhost:8080/produto",produto,this.token)
  }

  putProduto(produto: Produto):Observable<Produto>{
    return this.http.put<Produto>("http://localhost:8080/produto",produto,this.token)
  }

  deleteProduto(id:number):Observable<Produto>{
    return this.http.delete<Produto>(`http://localhost:8080/produto/${id}`, this.token)
  }
}
