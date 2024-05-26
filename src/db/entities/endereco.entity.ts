import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'endereco' })
export class EnderecoEntity {
  @PrimaryGeneratedColumn()
  idendereco: number;

  @Column({ type: 'varchar', length: 255 })
  rua: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complemento: string;

  @Column({ type: 'varchar', length: 255 })
  bairro: string;

  @Column({ type: 'varchar', length: 20 })
  cep: string;

  @Column({ type: 'varchar', length: 255 })
  municipio_uf: string;
}
