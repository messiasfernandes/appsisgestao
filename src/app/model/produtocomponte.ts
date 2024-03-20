import { Preco } from "./preco"

export class Produtocomponte {
   id:number
   nome:string
   subgrupo: string
   marca:string
   preco: Preco = new Preco
}

