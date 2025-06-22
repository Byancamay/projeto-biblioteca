import express from "express";
import { Request, Response } from "express";

import { UsuarioController } from "./controllers/UsuarioController";
import { LivroController } from "./controllers/LivroController";
import { EstoqueController } from "./controllers/EstoqueController";
import { EmprestimoController } from "./controllers/EmprestimoController";
import { CatalogController } from "./controllers/CatalogController";

const app = express();
const PORT = process.env.PORT ?? 3090;

app.use(express.json());

app.post("/library/usuarios", UsuarioController.cadastrarUsuario);
app.get("/library/usuarios", UsuarioController.listarUsuarios);
app.get("/library/usuarios/:cpf", UsuarioController.buscarUsuarioPorCpf);
app.put("/library/usuarios/:cpf", UsuarioController.atualizarUsuario);
app.delete("/library/usuarios/:cpf", UsuarioController.excluirUsuario);

app.post("/library/livros", LivroController.adicionarLivro);
app.get("/library/livros", LivroController.listarLivros);
app.get("library/livros/isbn", LivroController.buscarLivroPorIsbn);
app.put("/library/livros/:isbn", LivroController.atualizarLivro);
app.delete("/library/livros/:isbn", LivroController.excluirLivro);

app.post("/library/estoque", EstoqueController.cadastrarExemplar);
app.get("/library/estoque", EstoqueController.listarExemplares);
app.get("/library/estoque/:codigo", EstoqueController.buscarExemplarPorCodigo);
app.put("/library/estoque/:codigo", EstoqueController.atualizarExemplar);
app.delete("library/estoque/:codigo", EstoqueController.excluirExemplar);

app.post("libraryemprestimos", EmprestimoController.realizarEmprestimo);
app.get("/library/emprestimos", EmprestimoController.listarEmprestimo);
app.put("library/emprestimos/:id/devolucao", EmprestimoController.registrarDevolucao);

app.get("/library/catalogos/categorias-usuario", CatalogController.listarCategoriasLivro);
app.get("/library/catalogos/categorias-livro", CatalogController.listarCategoriasLivro);
app.get("/library/catalogos/cursos", CatalogController.listarCursos);

app.listen(PORT, () => {
    console.log(`API de Gestão de Biblioteca em execução no URL: http://localhost:${PORT}/library`);
});