import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
//import { dataDto } from './interfaces/dataInterface';
import { TransformData } from './transformer.service';
import { ConfigService } from '@nestjs/config';
import { NfeResponseDto } from '../dtos/nfe.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class NfeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly transformData: TransformData,
    private readonly configService: ConfigService,
  ) {}

  public async sendApiExtraiDados(
    image: Express.Multer.File,
  ): Promise<NfeResponseDto> {
    try {
      const id = 73;
      const token = this.configService.get<string>('TOKEN_EXTRAIDADOS');
      const url = this.configService.get<string>('URL_EXTRAIDADOS');
      const docClassification =
        this.configService.get<string>('DOC_EXTRAIDADOS');
      const buffer = fs.readFileSync(image.path);
      const imgBase64 = buffer.toString('base64');
      const data = {
        image: imgBase64,
        userId: id,
        documentClassification: docClassification,
      };

      const response: AxiosResponse = await this.httpService.axiosRef.post(
        url,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );

      if (response.status == 500) {
        throw new HttpException(
          'Ocorreu um erro no servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (response.status == 400) {
        throw new HttpException(
          'Erro na requisição do cliente',
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.transformData.transformer(response.data);
    } catch (error) {
      throw error;
    }
  }
}
