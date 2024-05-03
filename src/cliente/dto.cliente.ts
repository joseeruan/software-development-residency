import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class ClienteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nome: string;

  @IsString()
  @MinLength(3)
  @MaxLength(15)
  cpf_cnpj: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  endereco: string;

  @IsString()
  @MinLength(5)
  @MaxLength(15)
  telefone: string;

  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;
}
