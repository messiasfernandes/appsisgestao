import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutolistaComponent } from './produto/produtolista/produtolista.component';

const routes: Routes = [
  {
    path:'produtos', component: ProdutolistaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
