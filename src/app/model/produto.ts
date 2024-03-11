import { Estoque } from "./estoque"
import { Marca } from "./marca"
import { Preco } from "./preco"
import { Subgrupo } from "./subgrupo"
import { Produtodetalhe } from "./produtodetalhe"

export class Produto {
  id!: number
  nome?: string
  descricao?: string
  estoque?: Estoque = new Estoque()
  marca?: Marca = new Marca()
  preco?: Preco = new Preco()
  subgrupo?: Subgrupo =new Subgrupo()
  produtoDetalhe?: Produtodetalhe [] = []
}
