import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizaAutorDTO } from './dto/AtualizaAutor.dto';
import { CriaAutorDTO } from './dto/CriaAutor.dto';
import { ListaAutorDTO } from './dto/ListaAutor.dto';
import { AutorEntity } from './autor.entity';
import { AutorRepository } from './autor.repository';

@Controller('/autor')
export class AutorController {
  constructor(private autorRepository: AutorRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoAutor: CriaAutorDTO) {
    const autorEntity = new AutorEntity();
    autorEntity.email = dadosDoAutor.email;
    autorEntity.biografia = dadosDoAutor.biografia;
    autorEntity.nome = dadosDoAutor.nome;
    autorEntity.id = uuid();
    autorEntity.data = new Date();

    this.autorRepository.salvar(autorEntity);

    return {
      usuario: new ListaAutorDTO(autorEntity.id, autorEntity.nome, autorEntity.email, autorEntity.biografia, autorEntity.data),
      messagem: 'Autor criado com sucesso!',
    };
  }

  @Get()
  async listAutores() {
    const autoresSalvos = await this.autorRepository.listar();
    const autoresLista = autoresSalvos.map(
      (autor) => new ListaAutorDTO(autor.id, autor.nome, autor.email, autor.biografia, autor.data),
    );

    return autoresLista;
  }

  @Put('/:id')
  async atualizaAutor(
    @Param('id') id: string,
    @Body() novosDados: AtualizaAutorDTO,
  ) {
    const autorAtualizado = await this.autorRepository.atualiza(
      id,
      novosDados,
    );

    return {
      usuario: autorAtualizado,
      messagem: 'Autor atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeAutor(@Param('id') id: string) {
    const autorRemovido = await this.autorRepository.remove(id);

    return {
      usuario: autorRemovido,
      messagem: 'Autor removido com suceso!',
    };
  }
}
