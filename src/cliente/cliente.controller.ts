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
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto.cliente';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() cliente: ClienteDto): Promise<any> {
    return await this.clienteService.create(cliente);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.clienteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return await this.clienteService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.clienteService.remove(id);
  }
}
