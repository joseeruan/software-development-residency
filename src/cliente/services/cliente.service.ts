import {
  HttpException,
  HttpStatus,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { ProfileResponse } from '../interfaces/profile.interface';
import { FindByEmailResponse } from '../interfaces/findByEmail.interface';
import { ClienteEntity } from 'src/db/entities/cliente.entity';
import { ClienteDto } from '../dtos/cliente.dto';
import { ClienteOutputDto } from '../dtos/clienteOutput.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private ClienteRepository: Repository<ClienteEntity>,
  ) {}

  async create(
    cliente: ClienteDto,
  ): Promise<ClienteOutputDto | ConflictException> {
    const RegisteredCliente: FindByEmailResponse = await this.findByEmail(
      cliente.email,
    );

    if (RegisteredCliente) {
      throw new ConflictException(
        `O usuário ${cliente.nome} com email ${cliente.email} já está registrado`,
      );
    }

    const passwordHash: string = bcryptHashSync(cliente.senha, 10);

    const newClient: ClienteEntity = {
      nome: cliente.nome,
      cpf_cnpj: cliente.cpf_cnpj,
      telefone: cliente.telefone,
      email: cliente.email,
      senha_hash: passwordHash,
    };

    const createdCliente: ClienteEntity =
      await this.ClienteRepository.save(newClient);

    return this.mapEntityToDto(createdCliente);
  }

  async findById(idcliente: number): Promise<ClienteOutputDto | HttpException> {
    const userData: ClienteEntity = await this.ClienteRepository.findOne({
      where: { idcliente },
    });

    if (!userData) {
      throw new HttpException(
        `Nenhum cliente foi encontrado com esse ${idcliente} `,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapEntityToDto(userData);
  }

  async remove(id: string): Promise<void | HttpException> {
    const result: DeleteResult = await this.ClienteRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Nenhum cliente foi encontrado com o id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return;
  }

  async findAll(): Promise<ClienteEntity[] | null> {
    return await this.ClienteRepository.find({
      select: ['idcliente', 'nome', 'cpf_cnpj', 'telefone', 'email'],
    });
  }

  async findByEmail(email: string): Promise<FindByEmailResponse | null> {
    const userFound: ClienteEntity = await this.ClienteRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.idcliente,
      nome: userFound.nome,
      email: userFound.email,
      senha: userFound.senha_hash,
    };
  }

  async findByProfile(
    idcliente: number,
  ): Promise<ProfileResponse | HttpException> {
    const userData: ClienteEntity = await this.ClienteRepository.findOne({
      where: { idcliente },
    });

    if (!userData) {
      throw new HttpException(
        `Nenhum cliente foi encontrado com esse ${idcliente} `,
        HttpStatus.NOT_FOUND,
      );
    }

    const profile = this.mapEntityToDto(userData);
    return {
      nome: profile.nome,
      email: profile.email,
      telefone: profile.telefone,
    };
  }

  private mapEntityToDto(clienteEntity: ClienteEntity): ClienteOutputDto {
    return {
      id: clienteEntity.idcliente,
      nome: clienteEntity.nome,
      cpf_cnpj: clienteEntity.cpf_cnpj,
      telefone: clienteEntity.telefone,
      email: clienteEntity.email,
    };
  }
}
