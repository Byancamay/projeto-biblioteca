"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../models/CategoriaUsuario");
class CategoriaUsuarioRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
        this.add(new CategoriaUsuario_1.CategoriaUsuario(this.generateId(), "Professor"));
        this.add(new CategoriaUsuario_1.CategoriaUsuario(this.generateId(), "Aluno"));
        this.add(new CategoriaUsuario_1.CategoriaUsuario(this.generateId(), "Bibliotecário"));
    }
    static getInstance() {
        if (!CategoriaUsuarioRepository.instance) {
            CategoriaUsuarioRepository.instance = new CategoriaUsuarioRepository();
        }
        return CategoriaUsuarioRepository.instance;
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
        if (!item.id) { // Garante que o ID seja gerado se não for fornecido
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
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
