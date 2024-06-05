import { Telefone } from "./telefone";

export interface Apostador {
    _id: string,
    nome: string,
    endereco: string,
    telefone: Telefone
}
