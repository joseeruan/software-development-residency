import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClienteTomadorTable1715730066883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ClienteTomador (
                    idTomador SERIAL PRIMARY KEY,
                    razao_social VARCHAR(255),
                    cnpj VARCHAR(14),
                    inscricao_municipal VARCHAR(20),
                    email VARCHAR(255),
                    telefone VARCHAR(20),
                    idEndereco INT REFERENCES Endereco(idEndereco)); `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS ClienteTomador`);
  }
}
