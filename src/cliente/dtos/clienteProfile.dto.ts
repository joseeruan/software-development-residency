import { ApiProperty } from '@nestjs/swagger';

export class ProfileDTO {
  @ApiProperty({ description: 'Nome do cliente.' })
  nome: string;

  @ApiProperty({ description: 'E-mail do cliente.' })
  email: string;

  @ApiProperty({ description: 'Telefone do cliente.' })
  telefone: string;
}
