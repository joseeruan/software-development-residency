import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class ClienteOutputDto {
  @ApiProperty()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  nome: string;

  @ApiProperty()
  @IsString()
  @MinLength(9)
  @MaxLength(15)
  cpf_cnpj?: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  telefone?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;
}
