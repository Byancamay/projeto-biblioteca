import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private items: Emprestimo[] = [];
    private  nextId:number = 1;

    private constructor() {

    }
    
    public static getInstance(): EmprestimoRepository {
        if (!EmprestimoRepository.instance) {
            EmprestimoRepository.instance = new EmprestimoRepository();
        }
        return EmprestimoRepository.instance;
    }

    private generateId(): number {
        return this.nextId++;
    }

    findAll(): Emprestimo[] {
        return this.items;
    }

    findById(id: number): Emprestimo | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: Emprestimo): Emprestimo {
        if (!item.id) {
            item.id = this.generateId();
        }
        this.items.push(item);
        return item;
    }

    update(item: Emprestimo): Emprestimo | undefined {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item;
            return item;
        }
        return undefined;
    }

    delete(id:number): boolean {
        const initialLength = this.items. length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }
}