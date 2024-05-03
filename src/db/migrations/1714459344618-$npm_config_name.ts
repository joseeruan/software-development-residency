import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1714459344618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(` 
        create table Cliente (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            nome varchar(100),
            cpf_cnpj varchar(15),
            endereco varchar(255),
            telefone varchar(15),
            email varchar(255),
        ); `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS Cliente`);
  }
}
