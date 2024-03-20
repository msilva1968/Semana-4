import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class AtualizaAutorDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  @IsOptional()
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailEhUnico({ message: 'Já existe um autor com este e-mail!' })
  @IsOptional()
  email: string;

  @MinLength(5, { message: 'A biografia precisa ter pelo menos 500 caracteres!' })
  @IsOptional()
  biografia: string;
}
