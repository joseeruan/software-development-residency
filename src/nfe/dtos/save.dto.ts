export class SaveDto {
  valor_liquido_da_nota?: number;

  valor_do_pis?: number;

  valor_deducao_descontos?: string;

  valor_issrf?: string;

  telefone_tomador_de_servicos?: string;

  serie_nfse?: number;

  rua_tomador_de_servicos?: string;

  numero_nota_fiscal?: string;

  numero_endereco_tomador_de_servicos?: string;

  nome_razao_social_tomador_de_servicos?: string;

  municipio_tomador_de_servicos?: string;

  data_emissao?: string;

  cpf_cnpj_tomador_de_servicos?: string;

  cnpj_cpf_prestador_de_servicos?: string;

  bairro_tomador_de_servicos?: string;

  cep_tomador_de_serviccos?: string;

  valor_total_do_desconto?: string;

  valor_do_inss?: number;

  valor_do_cofins?: number;

  valor_issqn_retido?: number;

  uf_tomador_de_servicos?: string;

  retencoes_pis?: number;

  retencoes_cofins?: number;

  aliquota?: number;

  base_de_calculo?: number;
}

export class SaveResponseDto {
  message: string;
  id: number;
}
