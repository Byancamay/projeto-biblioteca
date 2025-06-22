import { Request, Response } from "express";
import { EstoqueService } from "../services/EstoqueService";

const estoqueService = new EstoqueService();

export class EstoqueController {
    static cadastrarExemplar(req: Request, res: Response): void {
        try {
            const { isbnLivro, quantidade } = req.body;
            if (!isbnLivro || quantidade === undefined || quantidade === null) {
                res.status(400).json({ status: "error", message: "Campos obrigatórios ausentes para o exemplar."});
                return;
            }
            const novoExemplar = estoqueService.cadastrarExemplar(isbnLivro, quantidade);
            res.status(201).json({ status: "sucess", data: novoExemplar });
        } catch (error: any) {
            res.status(400). json({ status: "error", message: error.message});
        }
    }

    static listarExemplares(req: Request, res: Response): void {
        try {
            const { disponivel, isbnLivro } = req.query;
            const filtros: { disponivel?: boolean; isbnLivro?: string } = {};

            if (disponivel !== undefined) filtros.disponivel = disponivel === 'true';
            if (isbnLivro) filtros.isbnLivro = isbnLivro as string;

            const exemplares = estoqueService.listarExemplares(filtros);
            res.status(200).json({ status: "sucess", data: exemplares });
        } catch (error: any) {
            res.status(500).json({ status: "error", message:"Erro ao listar exemplares."});
        }
    }

    static buscarExemplarPorCodigo(req: Request, res: Response): void {
        try {
            const { codigo } = req.params;
            const exemplar = estoqueService.buscarExemplarPorCodigo(parseInt(codigo));
            if (exemplar) {
                res.status(200).json({ status: "sucess", data: exemplar });
            } else {
                res.status(404).json({ status: "error", message: "Exemplar não encontrado."});
            }
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao buscar exemplar."});
        }
    }

    static atualizarExemplar(req: Request, res: Response): void {
        try {
            const { codigo } = req.params;
            const dadosAtualizacao = req.body;
            const exemplarAtualizacao = req.body;
            const exemplarAtualizado = estoqueService.atualizarExemplar(parseInt(codigo), dadosAtualizacao);
            res.status(200).json({ status: "error", data: exemplarAtualizado });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    static excluirExemplar(req: Request, res: Response): void {
        try {
            const { codigo } = req.params;
            const sucesso = estoqueService.excluirExemplar(parseInt(codigo));
            if (sucesso) {
                res.status(200).json({ status: "sucess", message: "exemplar removido com sucesso."})
            } else {
                res.status(400).json({ status: "error", message: "Exemplar não encontrado."})
            }
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}