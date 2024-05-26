import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { ClienteService } from '../services/cliente.service';
import { CreateClienteDto } from '../dtos/createCliente.dto';
import { ClienteOutputDto } from '../dtos/clienteOutput.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { ProfileDTO } from '../dtos/clienteProfile.dto';

@ApiTags('Clientes')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('register')
  @ApiCreatedResponse({
    type: ClienteOutputDto,
    description: 'Cliente registrado com sucesso.',
  })
  @ApiBadRequestResponse({
    description:
      'Requisição inválida. Certifique-se de fornecer todos os dados necessários.',
  })
  @ApiConflictResponse({ description: 'O cliente já está registrado.' })
  public async create(@Body() cliente: CreateClienteDto) {
    return await this.clienteService.create(cliente);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [ClienteOutputDto],
    description: 'Retorna a lista de todos os clientes.',
  })
  public async findAll() {
    return await this.clienteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ClienteOutputDto,
    description: 'Retorna o cliente correspondente ao ID fornecido.',
  })
  @ApiNotFoundResponse({
    description: 'Nenhum cliente encontrado com o ID fornecido.',
  })
  public async findById(@Param('id') id: number) {
    return await this.clienteService.findById(id);
  }

  @Get('profile/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ProfileDTO,
    description: 'Retorna o perfil do cliente correspondente ao ID fornecido.',
  })
  @ApiNotFoundResponse({
    description: 'Nenhum cliente encontrado com o ID fornecido.',
  })
  async Searchprofile(@Param('id') id: number) {
    return await this.clienteService.findByProfile(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Cliente excluído com sucesso.' })
  @ApiNotFoundResponse({
    description: 'Nenhum cliente encontrado com o ID fornecido.',
  })
  async remove(@Param('id') id: string) {
    return await this.clienteService.remove(id);
  }
}
