import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ClientePrestadorEntity } from './clientePrestador.entity';
import { ClienteTomadorEntity } from './clienteTomador.entity';
import { ServicosEntity } from './servicos.entity';

@Entity({ name: 'nfe' })
export class NfeEntity {
  @PrimaryGeneratedColumn()
  idnfe: number;

  @Column({ type: 'varchar', length: 20 })
  numero_nota: string;

  @Column({ type: 'date' })
  data_geracao: Date;

  @Column({ type: 'date' })
  data_competencia: Date;

  @Column({ type: 'varchar', length: 255 })
  codigo_autenticidade: string;

  @Column({ type: 'varchar', length: 255 })
  tributacao: string;

  @Column({ type: 'varchar', length: 20 })
  numero_rps: string;

  @Column({ type: 'varchar', length: 20 })
  serie_rps: string;

  @Column({ type: 'timestamp' })
  emissao_rps: Date;

  @OneToOne(() => ClientePrestadorEntity)
  @JoinColumn({ name: 'idprestador' })
  prestador: ClientePrestadorEntity;

  @OneToOne(() => ClienteTomadorEntity)
  @JoinColumn({ name: 'idtomador' })
  tomador: ClienteTomadorEntity;

  @OneToOne(() => ServicosEntity)
  @JoinColumn({ name: 'idservico' })
  servico: ServicosEntity;
}
