import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'client' })
export class Client {
  @PrimaryGeneratedColumn()
  clientid?: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 15 })
  cpf_cnpj: string;

  @Column({ length: 50 })
  phone_number: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 256 })
  password_hash: string;
}
