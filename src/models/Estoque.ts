import { Livro } from "./Livro";

export class Estoque {
    id: number; //código único de exemplar 
    livro: Livro;
    quantidade: number;
    quantidadeEmprestada: number;
    disponivel: boolean;

    constructor(id: number, livro: Livro, quantidade: number) {
        this.id = id;
        this.livro = livro;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = 0;
        this.disponivel = quantidade > 0;
    }

    emprestar(): boolean {
        if (this.disponivel && (this.quantidade - this.quantidadeEmprestada) > 0) {
            this.quantidadeEmprestada++;
            this.atualizarDisponibilidade();
            return true;
        }
        return false;
    }

    devolver(): boolean {
        if (this.quantidadeEmprestada > 0) {
            this.quantidadeEmprestada--;
            this.atualizarDisponibilidade();
            return true;
        }
        return false;
    }

    private atualizarDisponibilidade(): void {
        this.disponivel = (this.quantidade - this.quantidadeEmprestada) > 0; //hehe
    }
}