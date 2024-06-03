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

  constructor(private comandaService: ComandaService){}
  ngOnInit(): void {
    this.getMesa;
  }


  getMesa( ) {
 this.comandaService.pesquisar().subscribe((dados: any) => {
  console.log(dados);
  this.mesas = dados;


});
console.log(this.mesas)

  }
}
