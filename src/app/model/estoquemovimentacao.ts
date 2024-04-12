import { Produto } from 'src/app/model/produto';
import { Tipomovimentacao } from './../enumerado/tipomovimentacao';
export class Estoquemovimentacao {
  tipoMovimentacao: Tipomovimentacao;
  produto: Produto;
  qtde: number;
  saldoanterior: number = 0;
}
