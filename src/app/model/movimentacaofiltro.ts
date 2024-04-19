import { Operacao } from "../enumerado/opercao";
import { Filtro } from "./filtro";

export class Movimentacaofiltro extends Filtro {


  operacao : Operacao | undefined
  datanicio: Date
  datafim: Date
}
