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
import { ClienteDto } from '../dtos/cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('register')
  async create(@Body() cliente: ClienteDto) {
    return await this.clienteService.create(cliente);
  }

  @Get('findAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.clienteService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: number) {
    return await this.clienteService.findById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.clienteService.remove(id);
  }

  @Get('profile/:id')
  @HttpCode(HttpStatus.OK)
  async Searchprofile(@Param('id') id: number) {
    return await this.clienteService.findByProfile(id);
  }
}
