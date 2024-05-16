import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnderecoTable1715728508255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE Endereco (
                idEndereco SERIAL PRIMARY KEY,
                rua VARCHAR(255),
                complemento VARCHAR(255),
                bairro VARCHAR(255),
                cep VARCHAR(20),
                municipio_uf VARCHAR(255)); `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS Endereco`);
  }
}
