import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImageTable1714458202219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE NFE (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                numeroNFE VARCHAR(20),
                data_emissao TIMESTAMP,
                emitente_razao_social VARCHAR(255),
                emitente_cnpj VARCHAR(14),
                emitente_inscricao_estadual VARCHAR(20),
                emitente_endereco VARCHAR(255),
                destinatario_nome VARCHAR(255),
                destinatario_cpf_cnpj VARCHAR(15),
                destinatario_endereco VARCHAR(255),
                idCliente UUID, 
                imagem_nfe BYTEA 
            ); `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS NFE`);
  }
}
