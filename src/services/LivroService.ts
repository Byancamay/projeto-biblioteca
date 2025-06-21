import { Livro } from "../models/Livro";
import { LivroRepository } from "../repositories/LivroRepository";
import { CategoriaLivroRepository } from "../repositories/CategoriaLivroRepository";
import { EstoqueRepository } from "../repositories/EstoqueRepository";

export class LivroService {
    private livroRepository: LivroRepository;
    private categoriaLivroRepository: CategoriaLivroRepository;
    private estoqueRepository: EstoqueRepository;

    constructor() {
        this.livroRepository = LivroRepository.getInstance();
        this.categoriaLivroRepository = CategoriaLivroRepository.getInstance();
        this.estoqueRepository = EstoqueRepository.getInstance();
    }

    cadastrarLivro(titulo: string, isbn: string, autor: string, editora: string, edicao: string, categoriaId: number): Livro {
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

        const novoLivro = new Livro(0, titulo, autor, editora, edicao, isbn, categoria);
        return this.livroRepository.add(novoLivro);
    }

    listarLivros(filtros?: { titulo?: string; autor?: string; categoriaId?: number }): Livro[] {
        let livros = this.livroRepository.findAll();

        if (filtros?.titulo) {
            livros = livros.filter(l => l.titulo.toLowerCase().includes(filtros.titulo!.toLowerCase()));
        }
        if (filtros?.autor) {
            livros = livros.filter(l => l.autor.toLowerCase().includes(filtros.autor!.toLowerCase()));
        }
        if (filtros?.categoriaId) {
            livros = livros.filter(l => l.categoria.id === filtros.categoriaId);
        }
        return livros;
    }

    buscarLivroPorIsbn(isbn: string): Livro | undefined {
        return this.livroRepository.findByIsbn(isbn);
    }

    atualizarLivro(isbn: string, dadosAtualizacao: { titulo?: string; autor?: string; editora?: string; edicao?: string; categoriaId?: number }): Livro {
        const livro = this.livroRepository.findByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }

        if (dadosAtualizacao.titulo !== undefined) livro.titulo = dadosAtualizacao.titulo;
        if (dadosAtualizacao.autor !== undefined) livro.autor = dadosAtualizacao.autor;
        if (dadosAtualizacao.editora !== undefined) livro.editora = dadosAtualizacao.editora;
        if (dadosAtualizacao.edicao !== undefined) livro.edicao = dadosAtualizacao.edicao;
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

    excluirLivro(isbn: string): boolean {
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