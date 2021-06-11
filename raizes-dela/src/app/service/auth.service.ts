import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  entrar(userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>(`${environment.baseUrl}/usuario/logar`, userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${environment.baseUrl}/usuario/cadastrar`, user)
  }

  getByIdUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.baseUrl}/usuario/${id}`, this.token);
  }

  logado(){
    let ok: boolean = false

    if (environment.token != ''){
      ok = true
    }

    return ok
  }

  menuRodapeOff(){
    let ok: boolean = true
    if(this.router.url == '/login' || this.router.url == '/categoria-edit' || this.router.url == "/cadastrar" || this.router.url.indexOf("user-edit") == 1){
      ok = false
    }
    return ok
  }

  dadosUser(){
    let user = {
      nome: environment.nome,
      id: environment.id,
      tipoVendedor: environment.tipoVendedor,
      tipoAdministrador: environment.tipoAdministrador
    }
    return user
  }


  deslogado() {
    let ok: boolean = true

    if (environment.token != '') {
      ok = false
    }

    return ok
  }

}
