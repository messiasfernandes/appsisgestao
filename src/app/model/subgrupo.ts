import { Grupo } from "./grupo"

export class Subgrupo {
  id?: number
  nomeSubgrupo?: string
  grupo: Grupo =new Grupo()
}
