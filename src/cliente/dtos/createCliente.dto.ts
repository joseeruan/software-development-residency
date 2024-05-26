import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'José Ruan',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  nome: string;

  @ApiProperty({
    description: 'CPF ou CNPJ do cliente, necessário para identificação fiscal',
    example: '123.456.789-00',
  })
  @IsString()
  @MinLength(9)
  @MaxLength(15)
  cpf_cnpj: string;

  @ApiProperty({
    description: 'Número de telefone do cliente, utilizado para contato',
    example: '(11) 91234-5678',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  telefone: string;

  @ApiProperty({
    description:
      'Endereço de e-mail do cliente, necessário para login e comunicação',
    example: 'jose.ruan@example.com',
  })
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description: 'Senha do cliente, utilizada para autenticação',
    example: 'senhaSegura123',
  })
  @IsString()
  @MinLength(8)
  senha: string;
}
