import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ClienteModule } from './cliente/cliente.module';
import { NfeModule } from './nfe/nfe.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    ClienteModule,
    NfeModule,
  ],
})
export class AppModule {}
