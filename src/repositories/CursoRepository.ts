import { Curso } from "../models/Curso";

export class CursoRepository {
    private static instance: CursoRepository;
    private items: Curso[] = [];
    private nextId: number = 1;

    private constructor() {
        this.add(new Curso(this.generateId(), "Análise e desenvolvimento de Sistemas"));
        this.add(new Curso(this.generateId(), "Pedagogia"));
        this.add(new Curso(this.generateId(), "Administração"));
        this.add(new Curso(this.generateId(), "Engenharia de Produção"));
    }

    public static getInstance(): CursoRepository {
        if (!CursoRepository.instance) {
            CursoRepository.instance = new CursoRepository();
        }
        return CursoRepository.instance;
    }

    private generateId(): number {
        return this.nextId++;
    }

    findAll(): Curso[] {
        return this.items;
    }

    findById(id: number): Curso | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: Curso): Curso {
        if (!item.id) {
            item.id = this.generateId();
        }
        this.items.push(item);
        return item;
    }

    update(item: Curso): Curso | undefined {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item;
            return item;
        }
        return undefined
    }

    delete(id: number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }
}