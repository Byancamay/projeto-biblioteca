import { Request, Response } from "express";
import { LivroService } from "../services/LivroService";

const livroService = new LivroService();

export class LivroController {
    static adicionarLivro(req: Request, res: Response): void {
        try {
            const { titulo, isbn, autor, editora, edicao, categoriaId } = req.body;
            if (!titulo || !isbn || !autor || !editora || !edicao || !categoriaId) {
                res.status(400).json({ status: "error", message: "Campos obrigatórios ausentes para o livro." });
                return;
            }
            const novoLivro = livroService.cadastrarLivro(titulo, isbn, autor, editora, edicao, categoriaId);
            res.status(201).json({ status: "success", data: novoLivro });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    static listarLivros(req: Request, res: Response): void {
        try {
            const { titulo, autor, categoriaId } = req.query;
            const filtros: { titulo?: string; autor?: string; categoriaId?: number } = {};

            if (titulo) filtros.titulo = titulo as string;
            if (autor) filtros.autor = autor as string;
            if (categoriaId) filtros.categoriaId = parseInt(categoriaId as string);

            const livros = livroService.listarLivros(filtros);
            res.status(200).json({ status: "success", data: livros });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao listar livros." });
        }
    }

    static buscarLivroPorIsbn(req: Request, res: Response): void {
        try {
            const { isbn } = req.params;
            const livro = livroService.buscarLivroPorIsbn(isbn);
            if (livro) {
                res.status(200).json({ status: "success", data: livro });
            } else {
                res.status(404).json({ status: "error", message: "Livro não encontrado." });
            }
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao buscar livro." });
        }
    }

    static atualizarLivro(req: Request, res: Response): void {
        try {
            const { isbn } = req.params;
            const dadosAtualizacao = req.body;
            const livroAtualizado = livroService.atualizarLivro(isbn, dadosAtualizacao);
            res.status(200).json({ status: "success", data: livroAtualizado });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    static excluirLivro(req: Request, res: Response): void {
        try {
            const { isbn } = req.params;
            const sucesso = livroService.excluirLivro(isbn);
            if (sucesso) {
                res.status(200).json({ status: "success", message: "Livro removido com sucesso." });
            } else {
                res.status(404).json({ status: "error", message: "Livro não encontrado ou não pode ser removido." });
            }
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}