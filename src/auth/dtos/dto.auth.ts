import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description:
      'Token encriptografado para efetuar o login e acessar rotas protegidas.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I',
  })
  token: string;
  @ApiProperty({
    description: 'Tempo que token será válido.',
    example: '3600',
  })
  expiresIn: number;
}
