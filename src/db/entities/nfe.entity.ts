import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'nfe' })
export class Nfe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, nullable: true })
  numeronfe: string;

  @Column({ type: 'timestamp', nullable: true })
  data_emissao: Date;

  @Column({ length: 255, nullable: true })
  emitente_razao_social: string;

  @Column({ length: 14, nullable: true })
  emitente_cnpj: string;

  @Column({ length: 20, nullable: true })
  emitente_inscricao_estadual: string;

  @Column({ length: 255, nullable: true })
  emitente_endereco: string;

  @Column({ length: 255, nullable: true })
  destinatario_nome: string;

  @Column({ length: 15, nullable: true })
  destinatario_cpf_cnpj: string;

  @Column({ length: 255, nullable: true })
  destinatario_endereco: string;

  @Column({ type: 'bytea', nullable: true })
  imagem_nfe: Buffer;
}
