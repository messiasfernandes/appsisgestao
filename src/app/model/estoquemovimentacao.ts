import { Produto } from 'src/app/model/produto';
import { Tipomovimentacao } from './../enumerado/tipomovimentacao';
import { Operacao } from '../enumerado/opercao';
import { ItemMovimentacao } from './item-movimentacao';
import { Tipodemovimentacao } from './tipodemovimentacao';
export class Estoquemovimentacao {
  tipoMovimentacaoEstoque = new Tipodemovimentacao()
  datamovimento: Date;
  items: ItemMovimentacao[] = [];
}
