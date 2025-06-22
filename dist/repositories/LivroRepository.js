"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    static getInstance() {
        if (!LivroRepository.instance) {
            LivroRepository.instance;
        }
        return LivroRepository.instance;
    }
    generateId() {
        return this.nextId++;
    }
    findAll() {
        return this.items;
    }
    findbyId(id) {
        return this.items.find(item => item.id === id);
    }
    add(item) {
        if (!item.id) {
            item.id = this.generateId();
        }
        this.items.push(item);
        return item;
    }
    update(item) {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item;
            return item;
        }
        return undefined;
    }
    delete(id) {
        const initialLength = this.items.length;
        this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }
    findByIsbn(isbn) {
        return this.items.find(livro => livro.isbn === isbn);
    }
    findByUniqueCombination(autor, editora, edicao) {
        return this.items.find(livro => livro.autor === autor &&
            livro.editora === editora &&
            livro.edicao === edicao);
    }
}
exports.LivroRepository = LivroRepository;
