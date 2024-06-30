export interface Emprestimo {
    id?: string;
    livroId: string;
    UsuarioId: string;
    livro?: string;
    usuario?: string;
    dataEmprestimo?: string;
    dataDevolucao?: string;
}