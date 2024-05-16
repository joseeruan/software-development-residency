import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'endereco' })
export class endereco {
  @PrimaryGeneratedColumn()
  idEndereco?: string;

  @Column({ length: 255 })
  rua: string;

  @Column({ length: 255 })
  complemento: string;

  @Column({ length: 255 })
  bairro: string;

  @Column({ length: 20 })
  cep: string;

  @Column({ length: 255 })
  municipio_uf: string;
}
