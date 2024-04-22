import { Produto } from 'src/app/model/produto';
import { Tipomovimentacao } from './../enumerado/tipomovimentacao';
import { Operacao } from '../enumerado/opercao';
import { ItemMovimentacao } from './item-movimentacao';
export class Estoquemovimentacao {
  tipoMovimentacao: Tipomovimentacao;
  operacao: Operacao;
  datamovimento: Date;
  items: ItemMovimentacao[] = [];
}
