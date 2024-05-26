import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'servicos' })
export class ServicosEntity {
  @PrimaryGeneratedColumn()
  idservico: number;

  @Column({ type: 'text' })
  descricao_servicos: string;

  @Column({ type: 'varchar', length: 255 })
  atividade_municipio: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  aliquota: number;

  @Column({ type: 'varchar', length: 255 })
  item_lc: string;

  @Column({ type: 'varchar', length: 255 })
  codigo_nbs: string;

  @Column({ type: 'varchar', length: 255 })
  codigo_cnae: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_servicos: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  desc_incon: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  deducoes: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  base_calculo: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_issqn: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  issqn_retido: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  desc_condicionado: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  pis: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  cofins: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  inss: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  irrf: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  csll: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  outras_retencoes: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_issqn_retecoes: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor_liquido: number;
}
