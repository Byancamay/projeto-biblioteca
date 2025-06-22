"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    static getInstance() {
        if (!EmprestimoRepository.instance) {
            EmprestimoRepository.instance = new EmprestimoRepository();
        }
        return EmprestimoRepository.instance;
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
exports.EmprestimoRepository = EmprestimoRepository;
