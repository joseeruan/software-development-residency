import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { dataResponse } from './interfaces/dataInterface';
import { transformData } from './transformData.service';

@Injectable()
export class NfeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly transformData: transformData,
  ) {}

  async postApiDi2win(image: Express.Multer.File): Promise<dataResponse> {
    try {
      const id = 73;
      const docClassification = 'nfs';
      const buffer = fs.readFileSync(image.path);
      const imgBase64 = buffer.toString('base64');
      const data = {
        image: imgBase64,
        userId: id,
        documentClassification: docClassification,
      };

      const response = await this.httpService.axiosRef.post(
        'https://homol.extraidados.com.br/api/portalEngines-processApp/processWithoutFile',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `8LsOj14ouqioFtwugzhEnDAWGuMz45CQNkMh20WkNe7znZXsHZ`,
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

      return this.transformData.data(response.data);
    } catch (error) {
      throw error;
    }
  }

  async postAPISerpro() {
    try {
      const response = await this.httpService.axiosRef.get(
        'https://api.adviceslip.com/advice',
      );

      const data = {
        id: response.data.slip.id,
        advice: response.data.slip.advice,
      };

      console.log(data);
      return data;
      console.log(data);
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}
