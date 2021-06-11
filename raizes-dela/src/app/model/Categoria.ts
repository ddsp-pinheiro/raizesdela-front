import { Produto } from "./Produto"

export class Categoria{
    public id: number
    public nome: string
    public classificacao: string
    public ativo: boolean
    public produto: Produto[]
}