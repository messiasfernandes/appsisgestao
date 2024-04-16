import { Operacao } from "../enumerado/opercao";
import { Filtro } from "./filtro";

export class Movimentacaofiltro extends Filtro {
  operacao : Operacao
  datanicio: Date
  datafim: Date
}
