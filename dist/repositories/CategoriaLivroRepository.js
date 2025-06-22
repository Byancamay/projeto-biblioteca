"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../models/CategoriaLivro");
class CategoriaLivroRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
        this.add(new CategoriaLivro_1.CategoriaLivro(this.generateId(), "Romance"));
        this.add(new CategoriaLivro_1.CategoriaLivro(this.generateId(), "Computação"));
        this.add(new CategoriaLivro_1.CategoriaLivro(this.generateId(), "Literatura Brasileira"));
        this.add(new CategoriaLivro_1.CategoriaLivro(this.generateId(), "Leitura infantil"));
        this.add(new CategoriaLivro_1.CategoriaLivro(this.generateId(), "Ciência"));
    }
    static getInstance() {
        if (!CategoriaLivroRepository.instance) {
            CategoriaLivroRepository.instance = new CategoriaLivroRepository();
        }
        return CategoriaLivroRepository.instance;
    }
    generateId() {
        return this.nextId++;
    }
    findAll() {
        return this.items;
    }
    findById(id) {
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
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
