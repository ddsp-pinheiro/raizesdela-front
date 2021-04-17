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
    return this.http.get<Produto[]>(`${environment.baseUrl}/produto`)
  }

  getByIdProduto(id:number): Observable <Produto>{
    return this.http.get<Produto>(`${environment.baseUrl}/produto/${id}`)
  }

  getByNameProduto(nome:string): Observable <Produto[]>{
    return this.http.get<Produto[]>(`${environment.baseUrl}/produto/nome/${nome}`)
  }

  postProduto(produto:Produto):Observable<Produto>{
    return this.http.post<Produto>(`${environment.baseUrl}/produto`,produto,this.token)
  }

  putProduto(produto:Produto):Observable<Produto>{
    return this.http.put<Produto>(`${environment.baseUrl}/produto`,produto,this.token)
  }

  deleteProduto(id:number):Observable<Produto>{
    return this.http.delete<Produto>(`${environment.baseUrl}/produto/${id}`, this.token)
  }
}
