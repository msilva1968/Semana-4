import { Injectable } from '@nestjs/common';
import { AutorEntity } from './autor.entity';

@Injectable()
export class AutorRepository {
  private autores: AutorEntity[] = [];

  async salvar(autor: AutorEntity) {
    this.autores.push(autor);
  }

  async listar() {
    return this.autores;
  }

  async existeComEmail(email: string) {
    const existeAutor = this.autores.find(
      (autor) => autor.email === email,
    );

    return existeAutor !== undefined;
  }

  private buscaPorId(id: string) {
    const IdUsuario = this.autores.find(
      (autorSalvo) => autorSalvo.id === id,
    );

    if (!IdUsuario) {
      throw new Error('Autor não existe');
    }

    return IdUsuario;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<AutorEntity>) {
    const autor = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      autor[chave] = valor;
    });

    return autor;
  }

  async remove(id: string) {
    const autor = this.buscaPorId(id);
    this.autores = this.autores.filter(
      (autorSalvo) => autorSalvo.id !== id,
    );
    return autor;
  }
}
