import { Categoria } from "./Categoria"
import { Comentario } from "./Comentario"
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

    public quantidade: number
    public valorParcial: number

    public comentario: Comentario[]

}
