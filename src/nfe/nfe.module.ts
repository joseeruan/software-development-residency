import { Module } from '@nestjs/common';
import { NfeService } from './services/extraiDados.service';
import { NFEController } from './controllers/nfe.controller';
import { HttpModule } from '@nestjs/axios';
import { TransformData } from './services/transformer.service';
import { NfeDbService } from './services/nfe.db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerproService } from './services/serpro.service';
import { ClienteEntity } from 'src/db/entities/cliente.entity';
import { SolicitacaoMonitoramentoEntity } from 'src/db/entities/solicitacaoMonitoramento.entity';
import { ServicosEntity } from 'src/db/entities/servicos.entity';
import { ClientePrestadorEntity } from 'src/db/entities/clientePrestador.entity';
import { NfeEntity } from 'src/db/entities/nfe.entity';
import { EnderecoEntity } from 'src/db/entities/endereco.entity';
import { ClienteTomadorEntity } from 'src/db/entities/clienteTomador.entity';
import { ClienteService } from 'src/cliente/services/cliente.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClienteEntity,
      SolicitacaoMonitoramentoEntity,
      ServicosEntity,
      ClientePrestadorEntity,
      NfeEntity,
      EnderecoEntity,
      ClienteTomadorEntity,
    ]),
    HttpModule,
  ],
  providers: [
    NfeService,
    TransformData,
    NfeDbService,
    SerproService,
    ClienteService,
  ],
  controllers: [NFEController],
})
export class NfeModule {}
