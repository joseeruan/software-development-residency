import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Cliente extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 15 })
  cpf_cnpj: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ length: 15 })
  telefone: string;

  @Column({ length: 255 })
  email: string;
}
