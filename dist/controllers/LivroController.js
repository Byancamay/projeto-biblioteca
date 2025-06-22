"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../services/LivroService");
const livroService = new LivroService_1.LivroService();
class LivroController {
    static adicionarLivro(req, res) {
        try {
            const { titulo, isbn, autor, editora, edicao, categoriaId } = req.body;
            if (!titulo || !isbn || !autor || !editora || !edicao || !categoriaId) {
                res.status(400).json({ status: "error", message: "Campos obrigatórios ausentes para o livro." });
                return;
            }
            const novoLivro = livroService.cadastrarLivro(titulo, isbn, autor, editora, edicao, categoriaId);
            res.status(201).json({ status: "success", data: novoLivro });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
    static listarLivros(req, res) {
        try {
            const { titulo, autor, categoriaId } = req.query;
            const filtros = {};
            if (titulo)
                filtros.titulo = titulo;
            if (autor)
                filtros.autor = autor;
            if (categoriaId)
                filtros.categoriaId = parseInt(categoriaId);
            const livros = livroService.listarLivros(filtros);
            res.status(200).json({ status: "success", data: livros });
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao listar livros." });
        }
    }
    static buscarLivroPorIsbn(req, res) {
        try {
            const { isbn } = req.params;
            const livro = livroService.buscarLivroPorIsbn(isbn);
            if (livro) {
                res.status(200).json({ status: "success", data: livro });
            }
            else {
                res.status(404).json({ status: "error", message: "Livro não encontrado." });
            }
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao buscar livro." });
        }
    }
    static atualizarLivro(req, res) {
        try {
            const { isbn } = req.params;
            const dadosAtualizacao = req.body;
            const livroAtualizado = livroService.atualizarLivro(isbn, dadosAtualizacao);
            res.status(200).json({ status: "success", data: livroAtualizado });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
    static excluirLivro(req, res) {
        try {
            const { isbn } = req.params;
            const sucesso = livroService.excluirLivro(isbn);
            if (sucesso) {
                res.status(200).json({ status: "success", message: "Livro removido com sucesso." });
            }
            else {
                res.status(404).json({ status: "error", message: "Livro não encontrado ou não pode ser removido." });
            }
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}
exports.LivroController = LivroController;
