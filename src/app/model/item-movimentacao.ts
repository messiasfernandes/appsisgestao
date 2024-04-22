import { Produto } from './produto';

export class ItemMovimentacao {
  produto : Produto;
  qtde: number;
  saldoanterior: number=0;
}
