import { Module } from '@nestjs/common';
import { AutorController } from './autor.controller';
import { AutorRepository } from './autor.repository';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';

@Module({
  controllers: [AutorController],
  providers: [AutorRepository, EmailEhUnicoValidator],
})
export class AutorModule {}
