import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServicosTable1715730049208 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE Servicos (
            idServico SERIAL PRIMARY KEY,
            descricao_servicos TEXT,
            atividade_municipio VARCHAR(255),
            aliquota NUMERIC(10,2),
            item_lc VARCHAR(255),
            codigo_nbs VARCHAR(255),
            codigo_cnae VARCHAR(255),
            total_servicos NUMERIC(10,2),
            desc_incon NUMERIC(10,2),
            deducoes NUMERIC(10,2),
            base_calculo NUMERIC(10,2),
            total_issqn NUMERIC(10,2),
            issqn_retido NUMERIC(10,2),
            desc_condicionado NUMERIC(10,2),
            pis NUMERIC(10,2),
            cofins NUMERIC(10,2),
            inss NUMERIC(10,2),
            irrf NUMERIC(10,2),
            csll NUMERIC(10,2),
            outras_retencoes NUMERIC(10,2),
            valor_issqn_retecoes NUMERIC(10,2),
            valor_liquido NUMERIC(10,2)); `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS Servicos`);
  }
}
