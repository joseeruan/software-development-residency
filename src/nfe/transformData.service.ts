import { Injectable } from '@nestjs/common';

@Injectable()
export class transformData {
  async data(data: any): Promise<any> {
    const transform = [
      { cep: data?.resultados?.[0]?.camposExtraidos?.cep?.[0]?.text },
      {
        numero_endereco:
          data?.resultados?.[0]?.camposExtraidos?.numero_endereco?.[0]?.text,
      },
      { cpf_cnpj: data?.resultados?.[0]?.camposExtraidos?.cpf_cnpj?.[0]?.text },
      { telefone: data?.resultados?.[0]?.camposExtraidos?.telefone?.[0]?.text },
      { rua: data?.resultados?.[0]?.camposExtraidos?.rua?.[0]?.text },
      {
        razao_social:
          data?.resultados?.[0]?.camposExtraidos?.nome_razao_social?.[0]?.text,
      },
      {
        data_emissao:
          data?.resultados?.[0]?.camposExtraidos?.data_emissao?.[0]?.text,
      },
      {
        numero_nota:
          data?.resultados?.[0]?.camposExtraidos?.numero_nota_fiscal?.[0]?.text,
      },
      {
        codigo_verificacao:
          data?.resultados?.[0]?.camposExtraidos?.codigo_verificacao?.[0]?.text,
      },
    ];
    return transform;
  }
}
