import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClienteTable1715731130950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` CREATE TABLE Cliente (
        idCliente SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cpf_cnpj VARCHAR(15) NOT NULL,
        email VARCHAR(50) NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        senha_hash varchar(256) NOT NULL) `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS Cliente`);
  }
}
