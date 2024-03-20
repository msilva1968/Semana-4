import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class CriaAutorDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
  @EmailEhUnico({ message: 'Já existe um autor com este e-mail!' })
  email: string;

  @MinLength(100, { message: 'A biografia precisa ter pelo menos 100 caracteres!' })
  @MaxLength(500, { message: 'A biografia precisa ter no máximo 500 caracteres!'})
  biografia: string;
}
