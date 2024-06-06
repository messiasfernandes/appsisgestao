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

  constructor(private comandaService: ComandaService){
    this.getMesa();
  }
  ngOnInit(): void {
    this.getMesa;
  }


  getMesa( ) {
 this.comandaService.pesquisar().subscribe((dados: any) => {
  console.log(dados);
  this.mesas = dados;

});
}

}
