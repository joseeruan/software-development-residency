import { MigrationInterface, QueryRunner } from 'typeorm';

export class SolicitacaoMonitoramentoTable1715731332712
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE SolicitacaoMonitoramento (
                    idSolicitacao SERIAL PRIMARY KEY,
                    idCliente INT NOT NULL,
                    numeroNFE VARCHAR(20) NOT NULL,
                    statusMonitoramento VARCHAR(20) NOT NULL,
                    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS SolicitacaoMonitoramento`);
  }
}
