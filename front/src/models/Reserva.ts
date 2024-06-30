export interface Reserva {
    id?: string;
    livroId: string;
    usuarioId: string;
    emprestimoId?: string;
    livro?: string;
    usuario?: string;
    dataReserva?: string;
}