export interface Livro {
    id?: string;
    nome: string;
    descricao: string;
    dataPublicacao: Date;
    autorId?: string;
    generoId?: string;
}