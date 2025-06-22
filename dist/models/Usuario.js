"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id, nome, cpf, email, categoria, curso) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.categoria = categoria;
        this.curso = curso;
        this.ativo = true;
        this.dataSuspensaoAte = null;
    }
    suspender(dias) {
        const hoje = new Date();
        hoje.setDate(hoje.getDate() + dias);
        this.dataSuspensaoAte = hoje;
        if (dias > 60) {
            this.ativo = false;
        }
    }
    ativar() {
        this.ativo = true;
        this.dataSuspensaoAte = null;
    }
}
exports.Usuario = Usuario;
