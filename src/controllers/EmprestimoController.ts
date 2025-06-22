import { Request, Response } from "express";
import { EmprestimoService } from "../services/EmprestimoService";

const emprestimoService = new EmprestimoService();

export class EmprestimoController {
    static realizarEmprestimo(req: Request, res: Response): void {
        try {
            const { cpfUsuario, codigoExemplar } = req.body;
            if (!cpfUsuario || codigoExemplar === undefined || codigoExemplar === null) {
                res.status(400).json({ status: "error", message: "ampos obrigatórios ausentes para o empréstimo."});
                return;
            }
            const novoEmprestimo = emprestimoService.realizarEmprestimo(cpfUsuario, codigoExemplar);
            res.status(201).json({ status: "sucess", data: novoEmprestimo });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    static listarEmprestimo(req:Request, res: Response): void {
        try {
            const { ativo, cpfUsuario, codigoExemplar } = req.query;
            const filtros: { ativo?: boolean; cpfUsuario?: string; codigoExemplar?: number } = {};

            if (ativo !== undefined) filtros.ativo = ativo === 'true';
            if (cpfUsuario) filtros.cpfUsuario = cpfUsuario as string;
            if (codigoExemplar) filtros.codigoExemplar = parseInt(codigoExemplar as string);

            const emprestimo = emprestimoService.listarEmprestimos(filtros);
            res.status(200).json({ status: "sucess", data: emprestimo });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao listar empréstimo."});
        }
    }

    static registrarDevolucao(req: Request, res: Response): void {
        try {
            const { id } = req.params;
            const emprestimoDevolvido = emprestimoService.registrarDevolucao(parseInt(id));
            res.status(200).json({ status: "sucess", data: emprestimoDevolvido });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}