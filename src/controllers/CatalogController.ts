import { Request, Response } from "express";
import { CategoriaUsuarioRepository } from "../repositories/CategoriaUsuarioRepository";
import { CategoriaLivroRepository } from "../repositories/CategoriaLivroRepository";
import { CursoRepository } from "../repositories/CursoRepository";

const categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
const categoriaLivroRepository = CategoriaLivroRepository.getInstance();
const cursoRepository = CursoRepository.getInstance();


export class CatalogController {
    static listarCategoriasUsuario(req: Request, res: Response): void {
        try {
            const categrias = categoriaUsuarioRepository.findAll();
            res.status(200).json({ status: "sucess", data: categrias });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao listar categorias de usuário."});
        }
    }

    static listarCategoriasLivro(req: Request, res: Response): void {
        try {
            const categorias = categoriaLivroRepository.findAll();
            res.status(200).json({ status: "sucess", data: categorias });
        } catch (error: any) { 
            res.status(500).json({ status: "error", message: "Erro ao listar categorias de livro"});
        }
    }

    static listarCursos(req: Request, res: Response): void {
        try {
            const cursos = cursoRepository.findAll();
            res.status(200).json({ status: "success", data: cursos });
        } catch (error: any) {
            res.status(500).json({ status: "error", message: "Erro ao listar cursos." });
        }
    }
}