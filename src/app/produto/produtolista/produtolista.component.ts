import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Filtro } from 'src/app/model/filtro';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtolista',
  templateUrl: './produtolista.component.html',
  styleUrls: ['./produtolista.component.css']
})
export class ProdutolistaComponent  {
  produtofiltro = new Filtro()
  produtos : any[] = [];
  totalRegistros = 0;
constructor( private produtoService : ProdutoService) { }

buscar(pagina: number = 0): void {
  this.produtofiltro.pagina = pagina;

  this.produtoService.pesquisar(this.produtofiltro)
    .then((dados: any) => {
      this.produtos = dados.produtosreposta;
      console.log(this.produtos)
      this.totalRegistros = dados.total;

    });
}

aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.buscar(pagina);
}


}


