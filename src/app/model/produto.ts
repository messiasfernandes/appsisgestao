import { Estoque } from "./estoque"
import { Marca } from "./marca"
import { Preco } from "./preco"
import { Subgrupo } from "./subgrupo"
import { Produtodetalhe } from "./produtodetalhe"
import { TipoProduto } from "../enumerado/tipoproduto"

export class Produto {
  id!: number
  nome?: string
  descricao?: string
  imagem?: string
  estoque?: Estoque = new Estoque()
  marca: Marca = new Marca()
  preco: Preco = new Preco()
  tipoProduto!: TipoProduto
  subgrupo: Subgrupo =new Subgrupo()
  produtoDetalhe?: Produtodetalhe [] = []
}
