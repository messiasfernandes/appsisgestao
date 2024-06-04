import { Component, OnInit } from '@angular/core';
import { ComandaService } from 'src/app/services/comanda.service';

@Component({
  selector: 'app-mesacomandas',
  templateUrl: './mesacomandas.component.html',
  styleUrls: ['./mesacomandas.component.css']
})
export class MesacomandasComponent implements OnInit {
  layout: string = 'list';
  mesas: any[] = [];
  total:number=0

  constructor(private comandaService: ComandaService){}
  ngOnInit(): void {
    this.getMesa;
  }


  getMesa( ) {
 this.comandaService.pesquisar().subscribe((dados: any) => {
  console.log(dados);
  this.mesas = dados;
 this.calculateTotal();
});
}
  calculateTotal(): void {
    this.mesas.forEach(mesa => {
      console.log(`Capacidade da mesa: ${mesa.capacidade}`);
      console.log(`ID da mesa: ${mesa.id}`);
      console.log(`Localização da mesa: ${mesa.loclizacao}`);
      console.log(`Número da mesa: ${mesa.numerodaMesa}`);
      console.log(`Status da mesa: ${mesa.statusMesa}`);

      // Inicializa o total das comandas para esta mesa
   //  mesa.totalComandas = 0;

      mesa.comandas.forEach((comanda, index) => {
        console.log(`Comanda ${index + 1}:`);
        console.log(`  ID: ${comanda.id}`);
        console.log(`  Data de Abertura: ${comanda.data_abertura}`);
        console.log(`  Status de Pagamento: ${comanda.statusPagamentoComanda}`);
        console.log(`  Total: ${comanda.total}`);
        console.log(`  Itens da Comanda: ${comanda.itemsdaComanda.length}`);

        // Atualiza o total das comandas para esta mesa
        mesa.totalComandas += comanda.total;
      });
      this.total= mesa.totalComandas
      // Exibe o total das comandas para esta mesa
      console.log(`Total das Comandas da Mesa ${mesa.id}: ${mesa.totalComandas}`);
    });
  }
}
