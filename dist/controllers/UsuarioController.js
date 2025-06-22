"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../services/UsuarioService");
const usuarioService = new UsuarioService_1.UsuarioService();
class UsuarioController {
    static cadastrarUsuario(req, res) {
        try {
            const { nome, cpf, email, categoriaId, cursoId } = req.body;
            if (!nome || !cpf || !email || !categoriaId || !cursoId) {
                res.status(400).json({ status: "error", message: "Campos obrigatórios ausentes." });
                return;
            }
            const novoUsuario = usuarioService.cadastrarUsuario(nome, cpf, email, categoriaId, cursoId);
            res.status(201).json({ stat: "sucess", data: novoUsuario });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
    static listarUsuarios(req, res) {
        try {
            const { ativo, categoriaId, cursoId } = req.query;
            const filtros = {};
            if (ativo !== undefined)
                filtros.ativo = ativo === 'true';
            if (categoriaId)
                filtros.categoriaId = parseInt(categoriaId);
            if (cursoId)
                filtros.cursoId = parseInt(cursoId);
            const usuario = usuarioService.listarUsuarios(filtros);
            res.status(200).json({ status: "sucess", data: usuario });
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao listar usuários." });
        }
    }
    static buscarUsuarioPorCpf(req, res) {
        try {
            const { cpf } = req.params;
            const usuario = usuarioService.buscarUsuarioPorCpf(cpf);
            if (usuario) {
                res.status(200).json({ status: "sucess", data: usuario });
            }
            else {
                res.status(404).json({ status: "error", message: "Usuári não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao buscar usuário" });
        }
    }
    static atualizarUsuario(req, res) {
        try {
            const { cpf } = req.params;
            const dadosAtualizacao = req.body;
            const usuarioAtualizado = usuarioService.atualizarUsuario(cpf, dadosAtualizacao);
            res.status(200).json({ status: "sucess", data: usuarioAtualizado });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
    static excluirUsuario(req, res) {
        try {
            const { cpf } = req.params;
            const sucesso = usuarioService.excluirUsuario(cpf);
            if (sucesso) {
                res.status(200).json({ status: "sucess", message: "Usuario não encontrado ou não pode ser removido" });
            }
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}
exports.UsuarioController = UsuarioController;
