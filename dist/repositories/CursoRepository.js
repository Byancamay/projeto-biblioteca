"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const Curso_1 = require("../models/Curso");
class CursoRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
        this.add(new Curso_1.Curso(this.generateId(), "Análise e Desenvolvimento de Sistemas"));
        this.add(new Curso_1.Curso(this.generateId(), "Pedagogia"));
        this.add(new Curso_1.Curso(this.generateId(), "Administração"));
        this.add(new Curso_1.Curso(this.generateId(), "Engenharia de Produção"));
    }
    static getInstance() {
        if (!CursoRepository.instance) {
            CursoRepository.instance = new CursoRepository();
        }
        return CursoRepository.instance;
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
exports.CursoRepository = CursoRepository;
