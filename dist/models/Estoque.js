"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    constructor(id, livro, quantidade) {
        this.id = id;
        this.livro = livro;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = 0;
        this.disponivel = quantidade > 0;
    }
    emprestar() {
        if (this.disponivel && (this.quantidade - this.quantidadeEmprestada) > 0) {
            this.quantidadeEmprestada++;
            this.atualizarDisponibilidade();
            return true;
        }
        return false;
    }
    devolver() {
        if (this.quantidadeEmprestada > 0) {
            this.quantidadeEmprestada--;
            this.atualizarDisponibilidade();
            return true;
        }
        return false;
    }
    atualizarDisponibilidade() {
        this.disponivel = (this.quantidade - this.quantidadeEmprestada) > 0; //hehe
    }
}
exports.Estoque = Estoque;
