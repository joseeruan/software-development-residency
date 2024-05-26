export class PrestadorDTO {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
  inscricao_municipal: string;
  email: string;
  telefone: string;
  endereco: EnderecoDTO;
}

export class EnderecoDTO {
  rua: string;
  complemento: string;
  bairro: string;
  cep: string;
  municipio_uf: string;
}

export class TomadorDTO {
  razao_social: string;
  cnpj: string;
  inscricao_municipal: string;
  email: string;
  telefone: string;
  endereco: EnderecoDTO;
}

export class ServicoDTO {
  descricao_servicos: string;
  atividade_municipio: string;
  aliquota: number;
  item_lc: string;
  codigo_nbs: string;
  codigo_cnae: string;
  total_servicos: number;
  desc_incon: number;
  deducoes: number;
  base_calculo: number;
  total_issqn: number;
  issqn_retido: number;
  desc_condicionado: number;
  pis: number;
  cofins: number;
  inss: number;
  irrf: number;
  csll: number;
  outras_retencoes: number;
  valor_issqn_retecoes: number;
  valor_liquido: number;
}

export class FindNfeResponseDTO {
  numero_nota: string;
  data_geracao: Date;
  data_competencia: Date;
  codigo_autenticidade: string;
  tributacao: string;
  numero_rps: string;
  serie_rps: string;
  emissao_rps: Date;
  prestador: PrestadorDTO;
  tomador: TomadorDTO;
  servico: ServicoDTO;
}
