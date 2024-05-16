import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { DbModule } from './db/db.module';
//import { ClienteModule } from './cliente/cliente.module';
import { NfeModule } from './nfe/nfe.module';
//import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //DbModule,
    //ClienteModule,
    NfeModule,
   //AuthModule,
  ],
})
export class AppModule {}
