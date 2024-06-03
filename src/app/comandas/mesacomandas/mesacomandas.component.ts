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
  total: number = 0;
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
console.log(this.mesas)

  }
  calculateTotal(): void {
    this.total =0;
    this.mesas.forEach(mesa => {
      mesa.total = mesa.comandas.reduce((acc, comanda) => acc + comanda.total, 0);
      this.total += mesa.total;
    });

  }


}
