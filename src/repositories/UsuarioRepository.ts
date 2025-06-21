import { Usuario } from "../models";
import { CategoriaUsuario } from "../models/CategoriaUsuario";

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private items: Usuario[] = [];
    private nextId: number = 1;

    private constructor() {

    }

    public static getInstance(): UsuarioRepository {
        if (!UsuarioRepository.instance) {
            UsuarioRepository.instance = new UsuarioRepository();
        }
        return UsuarioRepository.instance;
    }

    private generateId(): number {
        return this.nextId++;
    }

    findAll(): Usuario[] {
        return this.items;
    }

    findById(id: number): Usuario | undefined {
        return this.items.find(item => item.id === id);
    }

    add(item: Usuario): Usuario {
        if (!item.id) {
            item.id = this.generateId();
        }
        this.items.push(item);
        return item;
    }

    update(item: Usuario): Usuario | undefined {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item;return item;
        }
        return undefined
    }

    delete(id: number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length < initialLength;
    }

    findByCpf(cpf: string): Usuario | undefined {
        return this.items.find(usuario => usuario.cpf === cpf);
    }
}