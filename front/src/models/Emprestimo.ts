export interface Emprestimo {
    id?: string;
    livroId: string;
    usuarioId: string;
    livro?: string;
    usuario?: string;
    dataEmprestimo?: string;
    dataDevolucao?: string;
}