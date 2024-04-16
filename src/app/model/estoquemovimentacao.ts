import { Produto } from 'src/app/model/produto';
import { Tipomovimentacao } from './../enumerado/tipomovimentacao';
import { Operacao } from '../enumerado/opercao';
export class Estoquemovimentacao {
  tipoMovimentacao: Tipomovimentacao;
   operacao:  Operacao;
  produto: Produto;
  datamovimento: Date
  qtde: number;
  saldoanterior: number = 0;
}
