import { Usuario } from "../models/Usuario";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repositories/CategoriaUsuarioRepository";
import { CursoRepository } from "../repositories/CursoRepository";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { ValidationService } from "./ValidationService";

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;
    private categoriaUsuarioRepository: CategoriaUsuarioRepository;
    private cursoRepository: CursoRepository;
    private emprestimoRepository: EmprestimoRepository;

    constructor() {
        this.usuarioRepository = UsuarioRepository.getInstance();
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
        this.cursoRepository = CursoRepository.getInstance();
        this.emprestimoRepository = EmprestimoRepository.getInstance();
    }

    cadastrarUsuario(nome: string, cpf: string, email: string, categoriaId: number, cursoId: number): Usuario {
        if (!ValidationService.validateCpf(cpf)) {
            throw new Error("CPF inválido.")
        }
        if (this.usuarioRepository.findByCpf(cpf)) {
            throw new Error("CPF já cadastrado.");
        }

        const categoria = this.categoriaUsuarioRepository.findById(categoriaId);
        if (!categoria) {
            throw new Error("Categoria de usuário inválida.");
        }

        const curso = this.cursoRepository.findById(cursoId);
        if (!curso) {
            throw new Error("Curso inválido.");
        }

        const novoUsuario = new Usuario(0, nome, cpf, categoria, curso);
        novoUsuario.ativo = true;
        return this.usuarioRepository.add(novoUsuario);
    }

    listarUsuarios(filtros?: { ativo?: boolean; categoriaId?: number; cursoId?: number }): Usuario[] {
        let usuarios = this.usuarioRepository.findAll();

        if (filtros?.ativo !== undefined) {
            usuarios = usuarios.filter(u => u.ativo=== filtros.ativo);
        }
        if (filtros?.categoriaId) {
            usuarios = usuarios.filter(u => u.categoria.id === filtros.categoriaId);
        }
        if (filtros?.cursoId) {
            usuarios = usuarios.filter(u => u.curso.id === filtros.cursoId);
        }
        return usuarios;
    }

    buscarUsuarioPorCpf(cpf: string): Usuario | undefined {
        return this.usuarioRepository.findByCpf(cpf);
    }

    atualizarUsuario(cpf: string, dadosAtualizacao: any ): Usuario {
        const usuario = this.usuarioRepository.findByCpf(cpf);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        if (dadosAtualizacao.nome !== undefined) usuario.nome = dadosAtualizacao.nome;
        if (dadosAtualizacao.email !== undefined) usuario.email = dadosAtualizacao.email;

        if (dadosAtualizacao.ativo !== undefined) usuario.ativo = dadosAtualizacao.ativo;
        if (dadosAtualizacao.dataSuspensaoAte !== undefined) usuario.dataSuspensaoAte = dadosAtualizacao.dataSuspensaoAte;

        this.usuarioRepository.update(usuario);
        return usuario;
    }

    excluirUsuario(cpf: string): boolean {
        const usuario = this.usuarioRepository.findByCpf(cpf);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
        
        const emprestimosPendentes = this.emprestimoRepository.findAll().filter(e => e.usuario.id === usuario.id && e.dataEntrega === null);
        if (emprestimosPendentes.length > 0) {
            throw new Error("Não é possível remover o usuário: existem empréstimos pendentes para regularização.");
        }
        return this.usuarioRepository.delete(usuario.id);
    }

    verificarESuspenderUsuario(usuario: Usuario): void {
        const emprestimoAtrasados = this.emprestimoRepository.findAll().filter(e => e.usuario.id === usuario.id && e.dataEntrega === null && e.dataDevolucaoPrevista < new Date());

        if (emprestimoAtrasados.length > 0) {
            let totalDiasAtraso = 0;
            emprestimoAtrasados.forEach(e => {
                const diffTime = Math.abs(new Date().getTime() - e.dataDevolucaoPrevista.getTime());
                totalDiasAtraso += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            });

            usuario.suspender(totalDiasAtraso * 3);
            if (totalDiasAtraso * 3 > 60) {
                usuario.ativo = false;
            }
        } else {
            usuario.ativar();
        }

        const emprestimosEmDebito = this.emprestimoRepository.findAll().filter(e => e.usuario.id === usuario.id && e.suspensaoAoDebito !== null && e.dataEntrega === null);

        if (emprestimosEmDebito.length > 2) {
            usuario.ativo = false;
        }

        this.usuarioRepository.update(usuario);
    }

    isUsuarioAtivoESemSuspensao(usuario: Usuario): boolean {
        if (!usuario.ativo) {
            throw new Error("Usuário inativo.");
        }

        if (usuario.dataSuspensaoAte && usuario.dataSuspensaoAte > new Date()) {
            throw new Error('Usuário suspenso até ${usuario.dataSuspensaoAte.toLocaleDateString()}. Não pode realizar empréstimos.');
        }
        return true;
    }
}