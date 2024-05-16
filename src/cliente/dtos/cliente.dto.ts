import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class ClienteDto {
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  nome: string;

  @IsString()
  @MinLength(9)
  @MaxLength(15)
  cpf_cnpj: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  telefone: string;

  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  senha: string;
}
