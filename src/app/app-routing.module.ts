import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutolistaComponent } from './produto/produtolista/produtolista.component';
import { ProdutocadastroComponent } from './produto/produtocadastro/produtocadastro.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutolistaComponent,
  },
  {
    path: 'produtos/novo',
    component: ProdutocadastroComponent,
  },
  { path: 'produtos/:id', component: ProdutocadastroComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
