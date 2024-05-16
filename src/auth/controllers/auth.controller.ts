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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('email') email: string,
    @Body('senha') senha: string,
  ): Promise<AuthResponseDto | Error> {
    if (!email || !senha) {
      throw new BadRequestException();
    }
    return this.authService.signIn(email, senha);
  }
}
