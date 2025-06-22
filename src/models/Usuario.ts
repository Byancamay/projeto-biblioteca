import { CategoriaUsuario } from "./CategoriaUsuario";
import { Curso } from "./Curso";

export class Usuario {
    public ativo: boolean; 
    public dataSuspensaoAte: Date | null; 

    constructor(
        public id: number,
        public nome: string,
        public cpf: string,
        public email: string, 
        public categoria: CategoriaUsuario,
        public curso: Curso
    ) {
        this.ativo = true; 
        this.dataSuspensaoAte = null;
    }

    suspender(dias: number): void {
        const hoje = new Date();
        hoje.setDate(hoje.getDate() + dias);
        this.dataSuspensaoAte = hoje;
        if (dias > 60) {
            this.ativo = false;
        }
    }

    ativar(): void {
        this.ativo = true;
        this.dataSuspensaoAte = null;
    }
}