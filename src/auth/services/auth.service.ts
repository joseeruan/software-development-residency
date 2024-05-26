import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClienteService } from 'src/cliente/services/cliente.service';
import { FindByEmailResponse } from 'src/cliente/interfaces/findByEmail.interface';
import { AuthResponseDto } from '../dtos/dto.auth';
import { compareSync as bcryptCompareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;

  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly clienteService: ClienteService,
  ) {
    this.jwtExpirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  public async signIn(email: string, senha: string): Promise<AuthResponseDto> {
    const userFound: FindByEmailResponse =
      await this.clienteService.findByEmail(email);

    if (!userFound || !bcryptCompareSync(senha, userFound.senha)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: userFound.id,
      nome: userFound.nome,
      email: userFound.email,
    };
    const token = this.jwt.sign(payload);
    return { token, expiresIn: this.jwtExpirationTime };
  }
}
