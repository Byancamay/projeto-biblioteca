"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../services/EmprestimoService");
const emprestimoService = new EmprestimoService_1.EmprestimoService();
class EmprestimoController {
    static realizarEmprestimo(req, res) {
        try {
            const { cpfUsuario, codigoExemplar } = req.body;
            if (!cpfUsuario || codigoExemplar === undefined || codigoExemplar === null) {
                res.status(400).json({ status: "error", message: "ampos obrigatórios ausentes para o empréstimo." });
                return;
            }
            const novoEmprestimo = emprestimoService.realizarEmprestimo(cpfUsuario, codigoExemplar);
            res.status(201).json({ status: "sucess", data: novoEmprestimo });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
    static listarEmprestimo(req, res) {
        try {
            const { ativo, cpfUsuario, codigoExemplar } = req.query;
            const filtros = {};
            if (ativo !== undefined)
                filtros.ativo = ativo === 'true';
            if (cpfUsuario)
                filtros.cpfUsuario = cpfUsuario;
            if (codigoExemplar)
                filtros.codigoExemplar = parseInt(codigoExemplar);
            const emprestimo = emprestimoService.listarEmprestimos(filtros);
            res.status(200).json({ status: "sucess", data: emprestimo });
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao listar empréstimo." });
        }
    }
    static registrarDevolucao(req, res) {
        try {
            const { id } = req.params;
            const emprestimoDevolvido = emprestimoService.registrarDevolucao(parseInt(id));
            res.status(200).json({ status: "sucess", data: emprestimoDevolvido });
        }
        catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}
exports.EmprestimoController = EmprestimoController;
