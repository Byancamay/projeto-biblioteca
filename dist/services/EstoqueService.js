"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../models/Estoque");
const EstoqueRepository_1 = require("../repositories/EstoqueRepository");
const LivroRepository_1 = require("../repositories/LivroRepository");
class EstoqueService {
    constructor() {
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
    }
    cadastrarExemplar(isbnLivro, quantidade) {
        const livro = this.livroRepository.findByIsbn(isbnLivro);
        if (!livro) {
            throw new Error("Livro não encontrado para cadastrar exemplar.");
        }
        if (quantidade <= 0) {
            throw new Error("A quantidade de exemplares deve ser maior que zero.");
        }
        // Um registro de estoque por livro com sua quantidade total de exemplares
        let exemplarExistente = this.estoqueRepository.findAll().find(e => e.livro.id === livro.id);
        if (exemplarExistente) {
            exemplarExistente.quantidade += quantidade;
            exemplarExistente.disponivel = (exemplarExistente.quantidade - exemplarExistente.quantidadeEmprestada) > 0;
            this.estoqueRepository.update(exemplarExistente);
            return exemplarExistente;
        }
        else {
            const novoExemplar = new Estoque_1.Estoque(0, livro, quantidade);
            return this.estoqueRepository.add(novoExemplar);
        }
    }
    listarExemplares(filtros) {
        let exemplares = this.estoqueRepository.findAll();
        if (filtros?.disponivel !== undefined) {
            exemplares = exemplares.filter(e => e.disponivel === filtros.disponivel);
        }
        if (filtros?.isbnLivro) {
            const livro = this.livroRepository.findByIsbn(filtros.isbnLivro);
            if (livro) {
                exemplares = exemplares.filter(e => e.livro.id === livro.id);
            }
            else {
                exemplares = []; // Livro não encontrado, retorna vazio
            }
        }
        return exemplares;
    }
    buscarExemplarPorCodigo(codigo) {
        return this.estoqueRepository.findByCodigo(codigo);
    }
    atualizarExemplar(codigo, dadosAtualizacao) {
        const exemplar = this.estoqueRepository.findByCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        if (dadosAtualizacao.quantidade !== undefined) {
            if (dadosAtualizacao.quantidade < exemplar.quantidadeEmprestada) {
                throw new Error("A nova quantidade total não pode ser menor que a quantidade já emprestada.");
            }
            exemplar.quantidade = dadosAtualizacao.quantidade;
            // Atualiza o status de disponível automaticamente após alterar a quantidade
            exemplar.disponivel = (exemplar.quantidade - exemplar.quantidadeEmprestada) > 0;
        }
        this.estoqueRepository.update(exemplar);
        return exemplar;
    }
    excluirExemplar(codigo) {
        const exemplar = this.estoqueRepository.findByCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        if (exemplar.quantidadeEmprestada > 0) {
            throw new Error("Não é possível remover o exemplar: ele está emprestado.");
        }
        return this.estoqueRepository.delete(codigo);
    }
}
exports.EstoqueService = EstoqueService;
