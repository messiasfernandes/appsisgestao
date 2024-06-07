import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutolistaComponent } from './produto/produtolista/produtolista.component';
import { ProdutocadastroComponent } from './produto/produtocadastro/produtocadastro.component';
import { ConsultaestoqueMmovimentoComponent } from './estoqueMovimento/consultaestoque-mmovimento/consultaestoque-mmovimento.component';
import { MesacomandasComponent } from './comandas/mesacomandas/mesacomandas.component';
import { CadastroComandaComponent } from './comandas/cadastro-comanda/cadastro-comanda.component';

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

  {
    path: 'movimentacoes',
    component: ConsultaestoqueMmovimentoComponent,
  },
  {
    path: 'comandas',
    component: MesacomandasComponent,
  },
  {
    path: 'comandas/novo',
    component: CadastroComandaComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
