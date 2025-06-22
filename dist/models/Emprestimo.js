"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    constructor(id, usuario, exemplar, diasEmprestimo) {
        this.id = id;
        this.usuario = usuario;
        this.exemplar = exemplar;
        this.dataEmprestimo = new Date();
        this.dataDevolucaoPrevista = this.calcularDataDevolucaoPrevista(diasEmprestimo);
        this.dataEntrega = null;
        this.diasAtraso = 0;
        this.suspensaoAoDebito = null;
    }
    calcularDataDevolucaoPrevista(dias) {
        const data = new Date(this.dataEmprestimo);
        data.setDate(data.getDate() + dias);
        return data;
    }
    registrarDevolucao() {
        this.dataEntrega = new Date();
        this.calcularAtrasoESuspensao();
        this.exemplar.devolver();
    }
    calcularAtrasoESuspensao() {
        if (this.dataEntrega && this.dataEntrega > this.dataDevolucaoPrevista) {
            const diffTime = Math.abs(this.dataEntrega.getTime() - this.dataDevolucaoPrevista.getTime());
            this.diasAtraso = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const diasSuspensao = this.diasAtraso * 3;
            if (diasSuspensao > 0) {
                const dataSuspensao = new Date(this.dataEntrega);
                dataSuspensao.setDate(dataSuspensao.getDate() + diasSuspensao);
                this.suspensaoAoDebito = dataSuspensao;
                if (diasSuspensao > 60) {
                    this.usuario.ativo = false;
                }
            }
        }
    }
}
exports.Emprestimo = Emprestimo;
