import { fileURLToPath } from "url";
import { Livro } from "../models/Livro";

export class LivroRepository {
    private static instance: LivroRepository;
    private items: Livro[] = [];
    private nextId: number = 1;

    private constructor() {

    }

    public static getInstance(): LivroRepository {
        if (!LivroRepository.instance) {
            LivroRepository.instance;
        }
        return LivroRepository.instance;
    }

    private generateId(): number {
        return this.nextId++;
    }

    findAll(): Livro[] {
        return this.items;
    }

    findbyId(id: number): Livro | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: Livro): Livro {
        if (!item.id) {
            item.id = this.generateId();
        }
        this.items.push(item);
        return item;
    }

    update(item: Livro): Livro | undefined {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item;
            return item;
        }
        return undefined;
    }

    delete(id: number): boolean {
        const initialLength = this.items.length;
        this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }

    findByIsbn(isbn: string): Livro | undefined {
        return this.items.find(livro => livro.isbn === isbn);
    }

    findByUniqueCombination (autor: string, editora: string, edicao: string): Livro | undefined {
        return this.items.find(livro =>
            livro.autor === autor &&
            livro.editora === editora &&
            livro.edicao === edicao
        );
    }
}