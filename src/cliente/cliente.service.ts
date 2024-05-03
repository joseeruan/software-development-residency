import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/db/entities/Cliente.entity';
import { Repository } from 'typeorm';
import { ClienteDto } from './dto.cliente';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private ClienteRepository: Repository<Cliente>,
  ) {}

  async create(newCliente: ClienteDto): Promise<any> {
    const dbCliente = new Cliente();
    dbCliente.nome = newCliente.nome;
    dbCliente.cpf_cnpj = newCliente.cpf_cnpj;
    dbCliente.endereco = newCliente.endereco;
    dbCliente.telefone = newCliente.telefone;
    dbCliente.email = newCliente.email;

    return await this.ClienteRepository.save(dbCliente);
  }

  async findById(id: string) {
    const result = await this.ClienteRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        `Nenhum cliente foi encontrado com esse ${id} `,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(result);
  }

  async remove(id: string) {
    const result = await this.ClienteRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Nenhum cliente foi encontrado com o id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<Cliente[]> {
    return await this.ClienteRepository.find({
      select: ['nome', 'cpf_cnpj', 'endereco', 'email', 'telefone'],
    });
  }

  private mapEntityToDto(clienteEntity: Cliente): ClienteDto {
    return {
      nome: clienteEntity.nome,
      cpf_cnpj: clienteEntity.cpf_cnpj,
      endereco: clienteEntity.endereco,
      telefone: clienteEntity.telefone,
      email: clienteEntity.email,
    };
  }
}
