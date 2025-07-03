import { Estoque } from "../models/Estoque";
import { Livro } from "../models/Livro";
import { EstoqueRepository } from "../repositories/EstoqueRepository";
import { LivroRepository } from "../repositories/LivroRepository";

export class EstoqueService {
    private estoqueRepository: EstoqueRepository;
    private livroRepository: LivroRepository;

    constructor() {
        this.estoqueRepository = EstoqueRepository.getInstance();
        this.livroRepository = LivroRepository.getInstance();
    }

    cadastrarExemplar(isbnLivro: string, quantidade: number): Estoque {
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
        } else {
            const novoExemplar = new Estoque(0, livro, quantidade);
            return this.estoqueRepository.add(novoExemplar);
        }
    }

    listarExemplares(filtros?: { disponivel?: boolean; isbnLivro?: string }): Estoque[] {
        let exemplares = this.estoqueRepository.findAll();

        if (filtros?.disponivel !== undefined) {
            exemplares = exemplares.filter(e => e.disponivel === filtros.disponivel);
        }
        if (filtros?.isbnLivro) {
            const livro = this.livroRepository.findByIsbn(filtros.isbnLivro);
            if (livro) {
                exemplares = exemplares.filter(e => e.livro.id === livro.id);
            } else {
                exemplares = []; // Livro não encontrado, retorna vazio
            }
        }
        return exemplares;
    }

    buscarExemplarPorCodigo(codigo: number): Estoque | undefined {
        return this.estoqueRepository.findByCodigo(codigo);
    }

    atualizarExemplar(codigo: number, dadosAtualizacao: { quantidade?: number }): Estoque {
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

    excluirExemplar(codigo: number): boolean {
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