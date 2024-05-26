import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthResponseDto } from '../dtos/dto.auth';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Autenticação')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    type: AuthResponseDto,
    description: 'Login efetuado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Requisição inválida com sucesso',
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciais erradas. Acesso negado.',
  })
  public async signIn(@Body() credentials: LoginDto) {
    try {
      if (!credentials.email || !credentials.senha) {
        throw new BadRequestException('E-mail e senha não podem ser nulos');
      }

      return this.authService.signIn(credentials.email, credentials.senha);
    } catch (error) {
      throw error;
    }
  }
}
