"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../services/EstoqueService");
const estoqueService = new EstoqueService_1.EstoqueService();
class EstoqueController {
    static cadastrarExemplar(req, res) {
        try {
            const { isbnLivro, quantidade } = req.body;
            if (!isbnLivro || quantidade === undefined || quantidade === null) {
                res.status(400).json({ status: "error", message: "Campos obrigatórios ausentes para o exemplar." });
                return;
            }
            const novoExemplar = estoqueService.cadastrarExemplar(isbnLivro, quantidade);
            res.status(201).json({ status: "sucess", data: novoExemplar });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
    static listarExemplares(req, res) {
        try {
            const { disponivel, isbnLivro } = req.query;
            const filtros = {};
            if (disponivel !== undefined)
                filtros.disponivel = disponivel === 'true';
            if (isbnLivro)
                filtros.isbnLivro = isbnLivro;
            const exemplares = estoqueService.listarExemplares(filtros);
            res.status(200).json({ status: "sucess", data: exemplares });
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao listar exemplares." });
        }
    }
    static buscarExemplarPorCodigo(req, res) {
        try {
            const { codigo } = req.params;
            const exemplar = estoqueService.buscarExemplarPorCodigo(parseInt(codigo));
            if (exemplar) {
                res.status(200).json({ status: "sucess", data: exemplar });
            }
            else {
                res.status(404).json({ status: "error", message: "Exemplar não encontrado." });
            }
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao buscar exemplar." });
        }
    }
    static atualizarExemplar(req, res) {
        try {
            const { codigo } = req.params;
            const dadosAtualizacao = req.body;
            const exemplarAtualizacao = req.body;
            const exemplarAtualizado = estoqueService.atualizarExemplar(parseInt(codigo), dadosAtualizacao);
            res.status(200).json({ status: "error", data: exemplarAtualizado });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
    static excluirExemplar(req, res) {
        try {
            const { codigo } = req.params;
            const sucesso = estoqueService.excluirExemplar(parseInt(codigo));
            if (sucesso) {
                res.status(200).json({ status: "sucess", message: "exemplar removido com sucesso." });
            }
            else {
                res.status(400).json({ status: "error", message: "Exemplar não encontrado." });
            }
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}
exports.EstoqueController = EstoqueController;
