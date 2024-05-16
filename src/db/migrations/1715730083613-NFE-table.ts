import { MigrationInterface, QueryRunner } from 'typeorm';

export class NFETable1715730083613 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE NFE (
            idNFe SERIAL PRIMARY KEY,
            numero_nota VARCHAR(20),
            data_geracao DATE,
            data_competencia DATE,
            codigo_autenticidade VARCHAR(255),
            tributacao VARCHAR(255),
            numero_rps VARCHAR(20),
            serie_rps VARCHAR(20),
            emissao_rps TIMESTAMP,
            idPrestador INT REFERENCES ClientePrestador(idPrestador),
            idTomador INT REFERENCES ClienteTomador(idTomador),
            idServico INT REFERENCES Servicos(idServico));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS NFE`);
  }
}
