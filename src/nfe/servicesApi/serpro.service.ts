import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class SerproService {
  private key: string;
  private secret: string;
  private tokenUrl: string;
  private serproUrl: string;
  private cachedToken: string;
  private tokenExpiration: Date;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.key = this.configService.get<string>('CONSUMER_KEY_SERPRO');
    this.secret = this.configService.get<string>('CONSUMER_SECRET_SERPRO');
    this.tokenUrl = this.configService.get<string>('TOKEN_URL_SERPRO');
    this.serproUrl = this.configService.get<string>('URL_SERPRO');
  }

  async verifyNFE(numeroNota: string): Promise<number | HttpException> {
    try {
      const token: string | HttpException = await this.getToken();

      const urlSerpro: string = this.serproUrl + numeroNota;

      const response: AxiosResponse = await this.httpService.axiosRef.get(
        urlSerpro,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status == 200) {
        return 1;
      } else if (response.status == 404) {
        throw new HttpException('NFE não encontrada', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Erro no servidor de autenticação',
          HttpStatus.BAD_GATEWAY,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Ocorreu um erro ao verificar a NFE',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getToken(): Promise<string | HttpException> {
    if (!this.cachedToken || this.tokenExpiration <= new Date()) {
      const concat: string = this.key + ':' + this.secret;
      const concat64: string = Buffer.from(concat, 'utf-8').toString('base64');

      const tokenResponse: AxiosResponse = await this.httpService.axiosRef.post(
        this.tokenUrl,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${concat64}`,
          },
        },
      );

      if (tokenResponse.status != 200) {
        throw new HttpException(
          'Ocorreu um erro ao solicitar um token',
          HttpStatus.BAD_REQUEST,
        );
      }

      this.cachedToken = (() => Object.values(tokenResponse)[3])();
      this.tokenExpiration = new Date(
        Date.now() + tokenResponse.data.expires_in * 1000,
      );
    }

    return this.cachedToken;
  }
}
