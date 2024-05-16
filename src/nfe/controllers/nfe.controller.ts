import {
  Controller,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../middleware/multer.config';
import { NfeService } from '../servicesApi/extraiDados.service';
import { TransformData } from '../servicesApi/transformer.service';
import { NfeDbService } from '../nfe.db.service';

@Controller('nfe')
export class NFEController {
  constructor(
    private readonly apiExter: NfeService,
    private readonly transform: TransformData,
    private readonly dbNfe: NfeDbService,
  ) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Nenhuma imagem foi enviada.');
      }
      const response = await this.apiExter.sendApiExtraiDados(file);
      // const response = await this.apiExter.postAPISerpro();

      return response;
    } catch (error) {
      throw error;
    }
  }
  /*
    @Post('test')
    // @HttpCode(HttpStatus.NO_CONTENT)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    create(@UploadedFile() file: Express.Multer.File, @Body() Body: any) {
     // const { id, chave } = Body;
    }*/

  @Post('test')
  async test(@Body() data: any) {
    const dataTransform = this.transform.transformer(data);
    //const dbSave = await this.dbNfe.save(dataTransform);
    return dataTransform;
    // return this.transform.transformer(data);
  }
}
