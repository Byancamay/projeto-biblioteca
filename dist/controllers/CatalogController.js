"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogController = void 0;
const CategoriaUsuarioRepository_1 = require("../repositories/CategoriaUsuarioRepository");
const CategoriaLivroRepository_1 = require("../repositories/CategoriaLivroRepository");
const CursoRepository_1 = require("../repositories/CursoRepository");
const categoriaUsuarioRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
const categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
const cursoRepository = CursoRepository_1.CursoRepository.getInstance();
class CatalogController {
    static listarCategoriasUsuario(req, res) {
        try {
            const categrias = categoriaUsuarioRepository.findAll();
            res.status(200).json({ status: "sucess", data: categrias });
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao listar categorias de usuário." });
        }
    }
    static listarCategoriasLivro(req, res) {
        try {
            const categorias = categoriaLivroRepository.findAll();
            res.status(200).json({ status: "sucess", data: categorias });
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao listar categorias de livro" });
        }
    }
    static listarCursos(req, res) {
        try {
            const cursos = cursoRepository.findAll();
            res.status(200).json({ status: "success", data: cursos });
        }
        catch (error) {
            res.status(500).json({ status: "error", message: "Erro ao listar cursos." });
        }
    }
}
exports.CatalogController = CatalogController;
