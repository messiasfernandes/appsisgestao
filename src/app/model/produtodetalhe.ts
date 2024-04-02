import { Unidademedida } from "../enumerado/unidademedida"
import { Atributo } from "./atributo"

export class ProdutoDetalhe {
  id?: number
  codigobarras?: string
  desconto?: number
  mutiplicador?: number
  unidadeMedida?:Unidademedida
  atributos : Atributo [] = []
}
