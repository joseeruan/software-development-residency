import {
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './middleware/multer.config';
import { NfeService } from './nfe.service';
//import { transform } from './transform.service';

@Controller('nfe')
export class NFEController {
  constructor(
    private apiExter: NfeService,
    //private fileService: transform,
  ) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Nenhuma imagem foi enviada.');
      }
      const response = await this.apiExter.postApiDi2win(file);

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
}
