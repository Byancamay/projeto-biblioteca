import { Usuario } from "./Usuario";
import { Estoque } from "./Estoque";

export class Emprestimo {
    id: number;
    usuario: Usuario;
    exemplar: Estoque;
    dataEmprestimo: Date;
    dataDevolucaoPrevista: Date; //calcula automaticamente
    dataEntrega: Date | null;
    diasAtraso: number;
    suspensaoAoDebito: Date | null; 

    constructor(id: number, usuario: Usuario, exemplar: Estoque, diasEmprestimo: number) {
        this.id = id;
        this.usuario = usuario;
        this.exemplar = exemplar;
        this.dataEmprestimo = new Date();
        this.dataDevolucaoPrevista = this.calcularDataDevolucaoPrevista(diasEmprestimo);
        this.dataEntrega = null;
        this.diasAtraso = 0;
        this.suspensaoAoDebito = null;
    }

    private calcularDataDevolucaoPrevista(dias: number): Date {
        const data = new Date(this.dataEmprestimo);
        data.setDate(data.getDate() + dias); 
        return data;
    }

    registrarDevolucao(): void {
        this.dataEntrega = new Date();
        this.calcularAtrasoESuspensao();
        this.exemplar.devolver();
    }

    private calcularAtrasoESuspensao(): void {
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