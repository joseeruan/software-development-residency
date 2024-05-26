import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from 'src/db/entities/cliente.entity';
import { ClientePrestadorEntity } from 'src/db/entities/clientePrestador.entity';
import { ClienteTomadorEntity } from 'src/db/entities/clienteTomador.entity';
import { EnderecoEntity } from 'src/db/entities/endereco.entity';
import { NfeEntity } from 'src/db/entities/nfe.entity';
import { ServicosEntity } from 'src/db/entities/servicos.entity';
import { SolicitacaoMonitoramentoEntity } from 'src/db/entities/solicitacaoMonitoramento.entity';
import { Repository } from 'typeorm';
import { SaveDto, SaveResponseDto } from '../dtos/save.dto';
import {
  EnderecoDTO,
  FindNfeResponseDTO,
  PrestadorDTO,
  ServicoDTO,
  TomadorDTO,
} from '../dtos/find.dto';
@Injectable()
export class NfeDbService {
  private idSolicitacao: number;
  constructor(
    @InjectRepository(ClienteEntity)
    private clienteRepository: Repository<ClienteEntity>,
    @InjectRepository(SolicitacaoMonitoramentoEntity)
    private solicitacaoMonitRepository: Repository<SolicitacaoMonitoramentoEntity>,
    @InjectRepository(ClienteTomadorEntity)
    private ClienteTomadorRepository: Repository<ClienteTomadorEntity>,
    @InjectRepository(ClientePrestadorEntity)
    private ClientePrestadorRepository: Repository<ClientePrestadorEntity>,
    @InjectRepository(NfeEntity)
    private NfeRepository: Repository<NfeEntity>,
    @InjectRepository(EnderecoEntity)
    private EnderecoRepository: Repository<EnderecoEntity>,
    @InjectRepository(ServicosEntity)
    private ServicosRepository: Repository<ServicosEntity>,
  ) {}

  public async save(
    idcliente: number,
    data: SaveDto,
  ): Promise<SaveResponseDto> {
    try {
      const cliente: ClienteEntity = await this.clienteRepository.findOne({
        where: { idcliente },
      });

      if (!cliente) {
        throw new NotFoundException('ID não encontrado.');
      }
      const solicitacao: SolicitacaoMonitoramentoEntity =
        new SolicitacaoMonitoramentoEntity();
      solicitacao.idcliente = cliente;
      solicitacao.numeronfe = data.numero_nota_fiscal;
      solicitacao.statusmonitoramento = 'Em andamento';

      const resultadoSolicitacao =
        await this.solicitacaoMonitRepository.save(solicitacao);
      this.idSolicitacao = resultadoSolicitacao.idsolicitacao;

      const servicos = await this.salvarServicos(data);
      const enderecoTomador = await this.salvarEnderecoTomador(data);
      const tomador = await this.salvarTomador(data, enderecoTomador);
      const enderecoPrestador = await this.salvarEnderecoPrestador(data);
      const prestador = await this.salvarPrestador(data, enderecoPrestador);

      const nfe: NfeEntity = new NfeEntity();
      nfe.prestador = prestador;
      nfe.tomador = tomador;
      nfe.servico = servicos;

      await this.NfeRepository.save(nfe);
      await this.solicitacaoMonitRepository.update(this.idSolicitacao, {
        statusmonitoramento: 'Concluido',
      });
      return {
        message: 'Os dados foram salvos com sucesso.',
        id: nfe.idnfe,
      };
    } catch (error) {
      await this.solicitacaoMonitRepository.update(this.idSolicitacao, {
        statusmonitoramento: 'Erro ao salvar',
      });

      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Ocorreu ao salvar os dados.');
      }
    }
  }

  private async salvarServicos(data: SaveDto) {
    const servicos: ServicosEntity = new ServicosEntity();
    servicos.aliquota = data.aliquota;
    servicos.base_calculo = data.base_de_calculo;
    servicos.pis = data.valor_do_pis;
    servicos.valor_issqn_retecoes = data.valor_issqn_retido;
    servicos.inss = data.valor_do_inss;
    await this.ServicosRepository.save(servicos);
    return servicos;
  }

  async salvarEnderecoTomador(data: SaveDto) {
    const gambiarra =
      data.municipio_tomador_de_servicos + '_' + data.uf_tomador_de_servicos;
    const enderecoTomador: EnderecoEntity = new EnderecoEntity();
    enderecoTomador.rua = data.rua_tomador_de_servicos;
    enderecoTomador.municipio_uf = gambiarra;
    enderecoTomador.bairro = data.bairro_tomador_de_servicos;
    await this.EnderecoRepository.save(enderecoTomador);
    return enderecoTomador;
  }

  private async salvarTomador(data: SaveDto, endereco: EnderecoEntity) {
    const tomador: ClientePrestadorEntity = new ClientePrestadorEntity();
    tomador.telefone = data.telefone_tomador_de_servicos;
    tomador.idendereco = endereco;
    await this.ClienteTomadorRepository.save(tomador);
    return tomador;
  }
  private async salvarEnderecoPrestador(data?: SaveDto) {
    const enderecoPrestador: EnderecoEntity = new EnderecoEntity();
    enderecoPrestador.bairro = 'Bairro de teste';
    await this.EnderecoRepository.save(enderecoPrestador);
    return enderecoPrestador;
  }
  private async salvarPrestador(data: SaveDto, endereco: EnderecoEntity) {
    const prestador: ClientePrestadorEntity = new ClientePrestadorEntity();
    prestador.idendereco = endereco;
    await this.ClientePrestadorRepository.save(prestador);
    return prestador;
  }

  public async findNfe(idnfe: number): Promise<FindNfeResponseDTO> {
    try {
      const nfe: NfeEntity = await this.NfeRepository.findOne({
        where: { idnfe: idnfe },
        relations: [
          'prestador',
          'prestador.idendereco',
          'tomador',
          'tomador.idendereco',
          'servico',
        ],
      });
      if (!nfe) {
        throw new NotFoundException('ID não encontrado.');
      }
      const nfeMap = this.mapEntityToDto(nfe);
      return nfeMap;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Erro interno ao realizar a busca',
        );
      }
    }
  }

  private mapEntityToDto(nfe: NfeEntity) {
    const nfeDto = new FindNfeResponseDTO();
    nfeDto.numero_nota = nfe.numero_nota;
    nfeDto.data_geracao = nfe.data_geracao;
    nfeDto.data_competencia = nfe.data_competencia;
    nfeDto.codigo_autenticidade = nfe.codigo_autenticidade;
    nfeDto.tributacao = nfe.tributacao;
    nfeDto.numero_rps = nfe.numero_rps;
    nfeDto.serie_rps = nfe.serie_rps;
    nfeDto.emissao_rps = nfe.emissao_rps;

    if (nfe.prestador) {
      const prestadorDto = new PrestadorDTO();
      prestadorDto.razao_social = nfe.prestador.razao_social;
      prestadorDto.nome_fantasia = nfe.prestador.nome_fantasia;
      prestadorDto.cnpj = nfe.prestador.cnpj;
      prestadorDto.inscricao_municipal = nfe.prestador.inscricao_municipal;
      prestadorDto.email = nfe.prestador.email;
      prestadorDto.telefone = nfe.prestador.telefone;

      if (nfe.prestador.idendereco) {
        const enderecoDto = new EnderecoDTO();
        enderecoDto.rua = nfe.prestador.idendereco.rua;
        enderecoDto.complemento = nfe.prestador.idendereco.complemento;
        enderecoDto.bairro = nfe.prestador.idendereco.bairro;
        enderecoDto.cep = nfe.prestador.idendereco.cep;
        enderecoDto.municipio_uf = nfe.prestador.idendereco.municipio_uf;
        prestadorDto.endereco = enderecoDto;
      }

      nfeDto.prestador = prestadorDto;
    }

    if (nfe.tomador) {
      const tomadorDto = new TomadorDTO();
      tomadorDto.razao_social = nfe.tomador.razao_social;
      tomadorDto.cnpj = nfe.tomador.cnpj;
      tomadorDto.inscricao_municipal = nfe.tomador.inscricao_municipal;
      tomadorDto.email = nfe.tomador.email;
      tomadorDto.telefone = nfe.tomador.telefone;

      if (nfe.tomador.idendereco) {
        const enderecoDto = new EnderecoDTO();
        enderecoDto.rua = nfe.tomador.idendereco.rua;
        enderecoDto.complemento = nfe.tomador.idendereco.complemento;
        enderecoDto.bairro = nfe.tomador.idendereco.bairro;
        enderecoDto.cep = nfe.tomador.idendereco.cep;
        enderecoDto.municipio_uf = nfe.tomador.idendereco.municipio_uf;
        tomadorDto.endereco = enderecoDto;
      }

      nfeDto.tomador = tomadorDto;
    }

    if (nfe.servico) {
      const servicoDto = new ServicoDTO();
      servicoDto.descricao_servicos = nfe.servico.descricao_servicos;
      servicoDto.atividade_municipio = nfe.servico.atividade_municipio;
      servicoDto.aliquota = nfe.servico.aliquota;
      servicoDto.item_lc = nfe.servico.item_lc;
      servicoDto.codigo_nbs = nfe.servico.codigo_nbs;
      servicoDto.codigo_cnae = nfe.servico.codigo_cnae;
      servicoDto.total_servicos = nfe.servico.total_servicos;
      servicoDto.desc_incon = nfe.servico.desc_incon;
      servicoDto.deducoes = nfe.servico.deducoes;
      servicoDto.base_calculo = nfe.servico.base_calculo;
      servicoDto.total_issqn = nfe.servico.total_issqn;
      servicoDto.issqn_retido = nfe.servico.issqn_retido;
      servicoDto.desc_condicionado = nfe.servico.desc_condicionado;
      servicoDto.pis = nfe.servico.pis;
      servicoDto.cofins = nfe.servico.cofins;
      servicoDto.inss = nfe.servico.inss;
      servicoDto.irrf = nfe.servico.irrf;
      servicoDto.csll = nfe.servico.csll;
      servicoDto.outras_retencoes = nfe.servico.outras_retencoes;
      servicoDto.valor_issqn_retecoes = nfe.servico.valor_issqn_retecoes;
      servicoDto.valor_liquido = nfe.servico.valor_liquido;

      nfeDto.servico = servicoDto;
    }

    return nfeDto;
  }
}
