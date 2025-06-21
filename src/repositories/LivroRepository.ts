import { CategoriaLivro } from "../models/CategoriaLivro";

export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;
    private items: CategoriaLivro[] = [];
    private nextId: number = 1;

    private constructor() {
        this.add(new CategoriaLivro(this.generateId(), "Romance"));
        this.add(new CategoriaLivro(this.generateId(), "Computação"));
        this.add(new CategoriaLivro(this.generateId(), "Literatura Brasileira"));
        this.add(new CategoriaLivro(this.generateId(), "Leitura infantil"));
        this.add(new CategoriaLivro(this.generateId(), "Ciência"));    
    }

    public static getInstance(): CategoriaLivroRepository {
        if (!CategoriaLivroRepository.instance) {
            CategoriaLivroRepository.instance = new CategoriaLivroRepository();
        }
        return CategoriaLivroRepository.instance;
    }

    private generateId(): number {
        return this.nextId++;
    }

    findAll(): CategoriaLivro[] {
        return this.items;
    }

    findById(id: number): CategoriaLivro | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: CategoriaLivro): CategoriaLivro {
        if (!item.id) {
            item.id = this.generateId();
        }
        this.items.push(item);
        return item;
    }

    update(item: CategoriaLivro): CategoriaLivro | undefined {
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
}