import { Unidademedida } from "../enumerado/unidademedida"

export class Produtodetalhe {
  id?: number
  codigobarras?: string
  desconto?: number
  mutiplicador?: number
  unidadeMedida?:Unidademedida
}
