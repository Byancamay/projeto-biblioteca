import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {
    static cadastrarUsuario(req: Request, res: Response): void {
        try {
            const { nome, cpf, email, categoriaId, cursoId } = req.body;

            if (!nome || !cpf || !email || !categoriaId || !cursoId) {
                res.status(400).json({ status: "error", message: "Campos obrigatórios ausentes."});
                return;
            }
            const novoUsuario = usuarioService.cadastrarUsuario(nome, cpf, email, categoriaId, cursoId);
            res.status(201).json({ stat: "sucess", data: novoUsuario });
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message});
        }
    }

    static listarUsuarios(req: Request, res: Response): void {
        try {
            const { ativo, categoriaId, cursoId } = req.query;
            const filtros: { ativo?: boolean; categoriaId?: number; cursoId?: number } = {};

            if (ativo !== undefined) filtros.ativo = ativo === 'true';
            if (categoriaId) filtros.categoriaId = parseInt(categoriaId as string);
            if (cursoId) filtros.cursoId = parseInt(cursoId as string);

            const usuario = usuarioService.listarUsuarios(filtros);
            res.status(200).json({ status: "sucess", data: usuario });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao listar usuários." });
        }
    }

    static buscarUsuarioPorCpf(req: Request, res: Response): void {
        try {
            const { cpf } = req.params;
            const usuario = usuarioService.buscarUsuarioPorCpf(cpf);
            if (usuario) { 
                res.status(200).json({ status: "sucess", data: usuario});
            } else {
                res.status(404).json({ status: "error", message: "Usuári não encontrado"});
            }
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao buscar usuário"});
        }
    }

    static excluirUsuario(req: Request,res: Response): void {
        try {
            const { cpf } = req.params;
            const sucesso = usuarioService.excluirUsuario(cpf);
            if (sucesso) {
                res.status(200).json({ status: "sucess", message: "Usuario não encontrado ou não pode ser removido"});
            }
        } catch (error: any) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}