import { Unidademedida } from "../enumerado/unidademedida"

export class ProdutoDetalhe {
  id?: number
  codigobarras?: string
  desconto?: number
  mutiplicador?: number
  unidadeMedida?:Unidademedida
}
