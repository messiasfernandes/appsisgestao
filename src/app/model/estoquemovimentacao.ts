import { Produto } from 'src/app/model/produto';

import { ItemMovimentacao } from './item-movimentacao';
import { Tipodemovimentacao } from './tipodemovimentacao';
export class Estoquemovimentacao {
  id:number
  tipoMovimentacaoEstoque= new Tipodemovimentacao()
  datamovimento: Date;
  items: ItemMovimentacao[] = [];
}
