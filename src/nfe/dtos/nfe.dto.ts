import { ApiProperty } from '@nestjs/swagger';

export class NfeResponseDto {
  @ApiProperty({ required: false })
  valor_liquido_da_nota?: string;

  @ApiProperty({ required: false })
  valor_do_pis?: string;

  @ApiProperty({ required: false })
  valor_deducao_descontos?: string;

  @ApiProperty({ required: false })
  valor_issrf?: string;

  @ApiProperty({ required: false })
  telefone_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  serie_nfse?: string;

  @ApiProperty({ required: false })
  rua_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  numero_nota_fiscal?: string;

  @ApiProperty({ required: false })
  numero_endereco_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  nome_razao_social_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  municipio_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  data_emissao?: string;

  @ApiProperty({ required: false })
  cpf_cnpj_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  cnpj_cpf_prestador_de_servicos?: string;

  @ApiProperty({ required: false })
  bairro_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  valor_total_do_desconto?: string;

  @ApiProperty({ required: false })
  valor_do_inss?: string;

  @ApiProperty({ required: false })
  valor_do_cofins?: string;

  @ApiProperty({ required: false })
  valor_issqn_retido?: string;

  @ApiProperty({ required: false })
  uf_tomador_de_servicos?: string;

  @ApiProperty({ required: false })
  retencoes_pis?: string;

  @ApiProperty({ required: false })
  retencoes_cofins?: string;

  @ApiProperty({ required: false })
  aliquota?: number;

  @ApiProperty({ required: false })
  base_de_calculo?: string;
}
