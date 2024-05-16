import { Module } from '@nestjs/common';
import { ClienteService } from './services/cliente.service';
import { ClienteController } from './controllers/cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/db/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  providers: [ClienteService],
  exports: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
