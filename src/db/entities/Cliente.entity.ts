import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'cliente' })
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  idcliente?: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 15 })
  cpf_cnpj: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 20 })
  telefone: string;

  @Column({ length: 256 })
  senha_hash: string;
}
