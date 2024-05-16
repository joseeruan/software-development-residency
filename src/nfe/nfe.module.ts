import { Module } from '@nestjs/common';
import { NfeService } from './servicesApi/extraiDados.service';
import { NFEController } from './controllers/nfe.controller';
import { HttpModule } from '@nestjs/axios';
import { TransformData } from './servicesApi/transformer.service';
import { NfeDbService } from './nfe.db.service';
//import { Nfe } from 'src/db/entities/nfe.entity';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { SerproService } from './servicesApi/serpro.service';

@Module({
  //TypeOrmModule.forFeature([Nfe]),
  imports: [HttpModule],
  providers: [NfeService, TransformData, NfeDbService, SerproService],
  controllers: [NFEController],
})
export class NfeModule {}
