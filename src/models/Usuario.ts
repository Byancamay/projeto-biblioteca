import { CategoriaUsuario } from "./CategoriaUsuario";
import { Curso } from "./Curso";

export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: boolean;
    categoria: CategoriaUsuario;
    curso: Curso;
    dataSuspensaoAte: Date | null; 
    email: string;

    constructor(
        id: number,
        nome: string,
        cpf: string,
        categoria: CategoriaUsuario,
        curso: Curso
    ) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = true;
        this.categoria = categoria;
        this.curso = curso;
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
