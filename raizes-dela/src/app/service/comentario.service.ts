import { Observable } from 'rxjs';
import { Comentario } from './../model/Comentario';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  getAllComents(): Observable <Comentario[]>{
    return this.http.get<Comentario[]>("http://localhost:8080/comentarios",this.token)
  }

  getComentById(id:number): Observable <Comentario>{
    return this.http.get<Comentario>(`http://localhost:8080/comentarios/${id}`, this.token)
  }

  postComent(comentario:Comentario):Observable<Comentario>{
    return this.http.post<Comentario>("http://localhost:8080/comentarios",comentario,this.token)
  }

  putComent(comentario: Comentario):Observable<Comentario>{
    return this.http.put<Comentario>("http://localhost:8080/comentarios",comentario,this.token)
  }

  deleteComent(id:number):Observable<Comentario>{
    return this.http.delete<Comentario>(`http://localhost:8080/comentarios/${id}`, this.token)
  }
   }