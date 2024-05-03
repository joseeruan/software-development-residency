import { Module } from '@nestjs/common';
import { NfeService } from './nfe.service';
import { NFEController } from './nfe.controller';
import { HttpModule } from '@nestjs/axios';
import { transformData } from './transformData.service';

@Module({
  imports: [HttpModule],
  providers: [NfeService, transformData],
  controllers: [NFEController],
})
export class NfeModule {}
