import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Usuario = new Usuario()
  nome = environment.nome
  token = environment.token
  id = environment.id
  tipoUsuario = environment.tipoVendedor

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    
  }

  sair() {
    this.router.navigate(["/home"])
    environment.token = ''
    environment.nome = ''
    environment.id = 0
  }

}
