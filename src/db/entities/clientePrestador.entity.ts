import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EnderecoEntity } from './endereco.entity';

@Entity({ name: 'clienteprestador' })
export class ClientePrestadorEntity {
  @PrimaryGeneratedColumn()
  idprestador: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  razao_social: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nome_fantasia: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  cnpj: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  inscricao_municipal: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefone: string;

  @OneToOne(() => EnderecoEntity)
  @JoinColumn({ name: 'idendereco' })
  idendereco: EnderecoEntity;
}
