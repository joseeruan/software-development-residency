import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/db/entities/Cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClienteService],
  exports: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
