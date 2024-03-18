import { Componente } from './componente';
import { Estoque } from "./estoque"
import { Marca } from "./marca"
import { Preco } from "./preco"
import { Subgrupo } from "./subgrupo"
import { ProdutoDetalhe } from "./produtodetalhe"
import { TipoProduto } from "../enumerado/tipoproduto"

export class Produto {
  id!: number
  nome?: string
  descricao?: string
  imagem?: string
  estoque?: Estoque
  marca: Marca
  preco: Preco = new Preco()
  codigoFabricante: string

  tipoProduto : TipoProduto
  subgrupo: Subgrupo
  produtoDetalhe?: ProdutoDetalhe [] = []
  componentes : Componente []=[]
}
