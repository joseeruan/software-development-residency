import { ClienteEntity } from './cliente.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'solicitacaomonitoramento' })
export class SolicitacaoMonitoramentoEntity {
  @PrimaryGeneratedColumn()
  idsolicitacao: number;

  @ManyToOne(() => ClienteEntity, cliente => cliente.idcliente)
  @JoinColumn({ name: 'idcliente' })
  idcliente: ClienteEntity;

  @Column({ type: 'varchar', length: 20 })
  numeronfe: string;

  @Column({ type: 'varchar', length: 20 })
  statusmonitoramento: string;
}
