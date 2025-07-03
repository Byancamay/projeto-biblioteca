"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../models/Emprestimo");
const EmprestimoRepository_1 = require("../repositories/EmprestimoRepository");
const UsuarioRepository_1 = require("../repositories/UsuarioRepository");
const EstoqueRepository_1 = require("../repositories/EstoqueRepository");
const UsuarioService_1 = require("./UsuarioService");
class EmprestimoService {
    constructor() {
        this.emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
        this.usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.usuarioService = new UsuarioService_1.UsuarioService();
    }
    realizarEmprestimo(cpfUsuario, codigoExemplar) {
        const usuario = this.usuarioRepository.findByCpf(cpfUsuario);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
        this.usuarioService.verificarESuspenderUsuario(usuario);
        this.usuarioService.isUsuarioAtivoESemSuspensao(usuario);
        const exemplar = this.estoqueRepository.findByCodigo(codigoExemplar);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        if (!exemplar.disponivel) {
            throw new Error("Exemplar não disponível para empréstimo.");
        }
        const emprestimosAtivosDoUsuario = this.emprestimoRepository.findAll().filter(e => e.usuario.id === usuario.id && e.dataEntrega === null);
        let limiteLivros;
        let diasEmprestimo;
        if (usuario.categoria.nome === "Professor") { //5 livros por 40 dias
            limiteLivros = 5;
            diasEmprestimo = 40;
        }
        else if (usuario.categoria.nome === "Aluno") { //3 livros por 15 dias
            limiteLivros = 3;
            diasEmprestimo = 15;
            if (exemplar.livro.categoria.nome === usuario.curso.nome) { //30 se for livro da áreea do curso
                diasEmprestimo = 30;
            }
        }
        else {
            throw new Error("Categoria de usuário sem regras de empréstimo definidas para empréstimos de livros.");
        }
        if (emprestimosAtivosDoUsuario.length >= limiteLivros) {
            throw new Error(`Limite de empréstimos excedido para ${usuario.categoria.nome}. Limite: ${limiteLivros}.`);
        }
        const emprestadoComSucesso = exemplar.emprestar();
        if (!emprestadoComSucesso) {
            throw new Error("Não foi possível emprestar o exemplar. Verifique a disponibilidade.");
        }
        this.estoqueRepository.update(exemplar);
        const novoEmprestimo = new Emprestimo_1.Emprestimo(0, usuario, exemplar, diasEmprestimo);
        return this.emprestimoRepository.add(novoEmprestimo);
    }
    listarEmprestimos(filtros) {
        let emprestimos = this.emprestimoRepository.findAll();
        if (filtros?.ativo !== undefined) {
            emprestimos = emprestimos.filter(e => (e.dataEntrega === null) === filtros.ativo);
        }
        if (filtros?.cpfUsuario) {
            const usuario = this.usuarioRepository.findByCpf(filtros.cpfUsuario);
            if (usuario) {
                emprestimos = emprestimos.filter(e => e.usuario.id === usuario.id);
            }
            else {
                emprestimos = [];
            }
        }
        if (filtros?.codigoExemplar) {
            emprestimos = emprestimos.filter(e => e.exemplar.id === filtros.codigoExemplar);
        }
        return emprestimos;
    }
    registrarDevolucao(idEmprestimo) {
        const emprestimo = this.emprestimoRepository.findById(idEmprestimo);
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }
        if (emprestimo.dataEntrega !== null) {
            throw new Error("Este empréstimo já foi devolvido.");
        }
        emprestimo.registrarDevolucao();
        this.emprestimoRepository.update(emprestimo);
        this.usuarioService.verificarESuspenderUsuario(emprestimo.usuario);
        return emprestimo;
    }
}
exports.EmprestimoService = EmprestimoService;
