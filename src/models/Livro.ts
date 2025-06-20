import { CategoriaLivro } from "./CategoriaLivro"; 

export class Livro {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    edicao: String;
    isbn: string;
    categoria: CategoriaLivro;

    constructor(
        id: number,
        titulo: string,
        autor: string,
        editora: string,
        edicao: string,
        isbn: string,
        categoria: CategoriaLivro
    ) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoria = categoria;
    }
}