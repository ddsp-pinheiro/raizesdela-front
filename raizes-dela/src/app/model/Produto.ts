import { Categoria } from "./Categoria"
import { Usuario } from "./Usuario"

export class Produto{
    public id: number
    public nome: string
    public descricao: string
    public estoque: number
    public imagem: string
    public valor: number
    public categoria: Categoria
    public usuario: Usuario
    public noCarrinho: boolean
}
