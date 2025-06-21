import { escape } from "querystring";
import { Estoque } from "../models/Estoque";

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private items: Estoque[] = [];
    private nextId: number = 1;

    private constructor() {

    }

    public static getInstance(): EstoqueRepository {
        if (!EstoqueRepository.instance) {
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }

    private generateId(): number {
        return this.nextId++;
    }

    findAll(): Estoque[] {
        return this.items;
    }

    findById(id: number): Estoque | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: Estoque): Estoque {
        if (!item.id) {
            item.id = this.generateId();
        }
        this.items.push(item);
        return item;
    }

    update(item: Estoque): Estoque | undefined {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item;
            return item;
        }
        return undefined;
    }

    delete(id: number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }

    findByCodigo(codigo: number): Estoque | undefined {
        return this.findById(codigo);
    }
}