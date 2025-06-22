"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    constructor(id, titulo, autor, editora, edicao, isbn, categoria) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoria = categoria;
    }
}
exports.Livro = Livro;
