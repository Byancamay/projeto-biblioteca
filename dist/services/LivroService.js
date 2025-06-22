"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../models/Livro");
const LivroRepository_1 = require("../repositories/LivroRepository");
const CategoriaLivroRepository_1 = require("../repositories/CategoriaLivroRepository");
const EstoqueRepository_1 = require("../repositories/EstoqueRepository");
class LivroService {
    constructor() {
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
        this.categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    }
    cadastrarLivro(titulo, isbn, autor, editora, edicao, categoriaId) {
        if (this.livroRepository.findByIsbn(isbn)) {
            throw new Error("ISBN já cadastrado. O ISBN deve ser único.");
        }
        if (this.livroRepository.findByUniqueCombination(autor, editora, edicao)) {
            throw new Error("Já existe um livro com a mesma combinação de autor, editora e edição.");
        }
        const categoria = this.categoriaLivroRepository.findById(categoriaId);
        if (!categoria) {
            throw new Error("Categoria de livro inválida.");
        }
        const novoLivro = new Livro_1.Livro(0, titulo, autor, editora, edicao, isbn, categoria);
        return this.livroRepository.add(novoLivro);
    }
    listarLivros(filtros) {
        let livros = this.livroRepository.findAll();
        if (filtros?.titulo) {
            livros = livros.filter(l => l.titulo.toLowerCase().includes(filtros.titulo.toLowerCase()));
        }
        if (filtros?.autor) {
            livros = livros.filter(l => l.autor.toLowerCase().includes(filtros.autor.toLowerCase()));
        }
        if (filtros?.categoriaId) {
            livros = livros.filter(l => l.categoria.id === filtros.categoriaId);
        }
        return livros;
    }
    buscarLivroPorIsbn(isbn) {
        return this.livroRepository.findByIsbn(isbn);
    }
    atualizarLivro(isbn, dadosAtualizacao) {
        const livro = this.livroRepository.findByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        if (dadosAtualizacao.titulo !== undefined)
            livro.titulo = dadosAtualizacao.titulo;
        if (dadosAtualizacao.autor !== undefined)
            livro.autor = dadosAtualizacao.autor;
        if (dadosAtualizacao.editora !== undefined)
            livro.editora = dadosAtualizacao.editora;
        if (dadosAtualizacao.edicao !== undefined)
            livro.edicao = dadosAtualizacao.edicao;
        if (dadosAtualizacao.categoriaId !== undefined) {
            const novaCategoria = this.categoriaLivroRepository.findById(dadosAtualizacao.categoriaId);
            if (!novaCategoria) {
                throw new Error("Nova categoria de livro inválida.");
            }
            livro.categoria = novaCategoria;
        }
        this.livroRepository.update(livro);
        return livro;
    }
    excluirLivro(isbn) {
        const livro = this.livroRepository.findByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        const exemplaresDoLivro = this.estoqueRepository.findAll().filter(e => e.livro.id === livro.id);
        const exemplaresEmprestados = exemplaresDoLivro.some(e => e.quantidadeEmprestada > 0);
        if (exemplaresEmprestados) {
            throw new Error("Não é possível remover o livro: existem exemplares emprestados.");
        }
        exemplaresDoLivro.forEach(e => this.estoqueRepository.delete(e.id));
        return this.livroRepository.delete(livro.id);
    }
}
exports.LivroService = LivroService;
