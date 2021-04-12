import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeComponent } from './rodape/rodape.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';
import { ProdutoComponent } from './produto/produto.component';
import { CadProdutoComponent } from './cad-produto/cad-produto.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { FormsModule } from '@angular/forms';
import { ProdutorasComponent } from './produtoras/produtoras.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { MeusProdutosComponent } from './meus-produtos/meus-produtos.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    MenuComponent,
    LoginComponent,
    CadastrarComponent,
    HomeComponent,
    ProdutoComponent,
    CadProdutoComponent,
    CarrinhoComponent,
    CadastrarComponent,
    ProdutorasComponent,
    SobreNosComponent,
    PagamentoComponent,
    UserEditComponent,
    ProdutoEditComponent,
    ProdutoDeleteComponent,
    MeusProdutosComponent,
    PesquisaComponent,
    CategoriaComponent,
    CategoriaEditComponent,
    TodosProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
