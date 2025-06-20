import { CategoriaUsuario } from "../models/CategoriaUsuario"; 

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;
    private items: CategoriaUsuario[] = [];
    private nextId: number = 1;

    private constructor() {
        this.add(new CategoriaUsuario(this.generateId(), "Professor"));
        this.add(new CategoriaUsuario(this.generateId(), "Aluno"));
        this.add(new CategoriaUsuario(this.generateId(), "Bibliotecário"));
    }

    public static getInstance(): CategoriaUsuarioRepository {
        if(!CategoriaUsuarioRepository.instance) {
            CategoriaUsuarioRepository.instance = new CategoriaUsuarioRepository();
        }
        return CategoriaUsuarioRepository.instance;
    }

    private generateId(): number {
        return this.nextId++;
    }

    findAll(): CategoriaUsuario[] {
        return this.items;
    }
    findById(id: number): CategoriaUsuario | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: CategoriaUsuario): CategoriaUsuario {
        if (!item.id) { // Garante que o ID seja gerado se não for fornecido
            item.id = this.generateId();
        } 
        this.items.push(item);
        return item;  
    }

    update(item: CategoriaUsuario): CategoriaUsuario | undefined {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item;
            return item;
        }
        return undefined;
    }

    delete(id:number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }
}