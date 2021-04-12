import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { ProdutoComponent } from './produto/produto.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { CadProdutoComponent } from './cad-produto/cad-produto.component';
import { ProdutorasComponent } from './produtoras/produtoras.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { ProdutoEditComponent } from './edit/produto-edit/produto-edit.component';
import { ProdutoDeleteComponent } from './delete/produto-delete/produto-delete.component';
import { MeusProdutosComponent } from './meus-produtos/meus-produtos.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaEditComponent } from './edit/categoria-edit/categoria-edit.component';
import { TodosProdutosComponent } from './todos-produtos/todos-produtos.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'cadastrar', component:CadastrarComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'produto/:id', component: ProdutoComponent},
  {path: 'todos-produtos', component: TodosProdutosComponent},
  {path: 'cad-produto', component: CadProdutoComponent},
  {path: 'produtoras', component: ProdutorasComponent},
  {path: 'sobre-nos', component: SobreNosComponent},
  {path: 'pagamento/:total', component: PagamentoComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user-edit/:id', component: UserEditComponent},
  {path: 'produto-edit/:id', component: ProdutoEditComponent},
  {path: 'produto-delete/:id', component: ProdutoDeleteComponent},
  {path: 'meus-produtos', component: MeusProdutosComponent},
  {path: 'pesquisa/:busca', component: PesquisaComponent},
  {path: 'categoria/:id', component: CategoriaComponent},
  {path: 'categoria-edit', component: CategoriaEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
