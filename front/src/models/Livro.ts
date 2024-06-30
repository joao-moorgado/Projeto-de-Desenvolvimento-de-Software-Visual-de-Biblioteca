export interface Livro {
    id?: string;
    nome: string;
    descricao: string;
    autorId?: string;
    generoId?: string;
    dataPublicacao: string;
    disponibilidade: boolean;
}