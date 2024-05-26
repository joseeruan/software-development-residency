import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EnderecoEntity } from './endereco.entity';

@Entity({ name: 'clientetomador' })
export class ClienteTomadorEntity {
  @PrimaryGeneratedColumn()
  idtomador?: number;

  @Column({ type: 'varchar', length: 255 })
  razao_social: string;

  @Column({ type: 'varchar', length: 14 })
  cnpj: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  inscricao_municipal: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @OneToOne(() => EnderecoEntity)
  @JoinColumn({ name: 'idendereco' })
  idendereco: EnderecoEntity;
}
