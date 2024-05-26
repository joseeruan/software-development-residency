import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiHeader,
} from '@nestjs/swagger';
import multerConfig from '../middleware/multer.config';
import { NfeService } from '../services/extraiDados.service';
import { TransformData } from '../services/transformer.service';
import { FindNfeResponseDTO } from '../dtos/find.dto';
import { NfeResponseDto } from '../dtos/nfe.dto';
import { NfeDbService } from '../services/nfe.db.service';
import { SaveDto, SaveResponseDto } from '../dtos/save.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
@ApiTags('NFE')
@Controller('nfe')
export class NFEController {
  constructor(
    private readonly apiExter: NfeService,
    private readonly transform: TransformData,
    private readonly db: NfeDbService,
  ) {}

  @Post('upload')
  @ApiHeader({
    name: 'Authorization ',
    description: 'Insira o token no formato: Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Dados extraídos com sucesso.',
    type: NfeResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Nenhuma imagem foi enviada.' })
  @ApiInternalServerErrorResponse({
    description: 'Ocorreu um erro no servidor.',
  })
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Nenhuma imagem foi enviada.');
      }
      const response = await this.apiExter.sendApiExtraiDados(file);
      return response;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('test')
  @ApiOkResponse({
    description: 'Dados extraídos com sucesso.',
    type: NfeResponseDto,
  })
  public async test(@Body() data: any) {
    const dataTransform = this.transform.transformer(data);
    //const dbSave = await this.dbNfe.save(dataTransform);
    return dataTransform;
    // return this.transform.transformer(data);
  }

  @Post('save/:id')
  @ApiOkResponse({
    description: 'Dados salvos com sucesso.',
    type: SaveResponseDto,
  })
  public async testar(
    @Param('id') id: number,
    @Body('') data: SaveDto,
  ): Promise<SaveResponseDto> {
    return await this.db.save(id, data);
  }
  @Get('find/:id')
  @ApiOkResponse({
    description: 'Busca concluida com sucesso.',
    type: FindNfeResponseDTO,
  })
  @HttpCode(HttpStatus.OK)
  public async find(@Param('id') id: number): Promise<FindNfeResponseDTO> {
    return await this.db.findNfe(id);
  }
}
