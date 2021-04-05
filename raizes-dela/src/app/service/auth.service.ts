import { Produto } from './../model/Produto';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuario/logar', userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('http://localhost:8080/usuario/cadastrar', user)
  }

 /* vendedora(){
    let ok = false

    if(environment.tipoVendedor == true){
      ok = true
    }

    return ok
  }*/
  /* logado(){
    let logado = false

    if(environment.token != ''){
      logado = true
    }

    return logado*/
}
