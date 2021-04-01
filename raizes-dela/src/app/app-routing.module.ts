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
import { MeusProdutosComponent } from './meus-produtos/meus-produtos.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'cadastrar', component:CadastrarComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'cad-produto', component: CadProdutoComponent},
  {path: 'produtoras', component: ProdutorasComponent},
  {path: 'sobre-nos', component: SobreNosComponent},
  {path: 'pagamento', component: PagamentoComponent},
  {path: 'home', component: HomeComponent},
  {path: 'meus-produtos', component: MeusProdutosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
