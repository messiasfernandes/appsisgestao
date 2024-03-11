import { Marca } from './../../model/marca';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Produto } from 'src/app/model/produto';

@Component({
  selector: 'app-produtocadastro',
  templateUrl: './produtocadastro.component.html',
  styleUrls: ['./produtocadastro.component.css']
})
export class ProdutocadastroComponent {
  produto = new Produto()
  marca =new Marca()
  constructor(){}

  salvar(form: NgForm){}
 showMarca(){

 }
}
