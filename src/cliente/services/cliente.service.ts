import {
  HttpException,
  HttpStatus,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { FindByEmailResponse } from '../interfaces/findByEmail.interface';
import { ClienteEntity } from 'src/db/entities/cliente.entity';
import { CreateClienteDto } from '../dtos/createCliente.dto';
import { ClienteOutputDto } from '../dtos/clienteOutput.dto';
import { ProfileDTO } from '../dtos/clienteProfile.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity)
    private ClienteRepository: Repository<ClienteEntity>,
  ) {}

  public async create(cliente: CreateClienteDto): Promise<ClienteOutputDto> {
    try {
      if (!cliente.email || !cliente.nome || !cliente.senha) {
        throw new HttpException(
          'Error: Dados incompletos',
          HttpStatus.BAD_REQUEST,
        );
      }

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
    } catch (error) {
      if (error instanceof ConflictException || error instanceof HttpException)
        throw error;
      else {
        throw new InternalServerErrorException(
          'Erro ao realizar esse procedimento',
        );
      }
    }
  }

  public async findById(idcliente: number): Promise<ClienteOutputDto> {
    try {
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
    } catch (error) {
      if (error instanceof HttpException) throw error;
      else {
        throw new InternalServerErrorException(
          'Ocorreu um erro ao buscar o usuário',
        );
      }
    }
  }

  public async findAll(): Promise<ClienteEntity[] | null> {
    try {
      return await this.ClienteRepository.find({
        select: ['idcliente', 'nome', 'cpf_cnpj', 'telefone', 'email'],
      });
    } catch {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar todos os clientes',
      );
    }
  }

  public async findByEmail(email: string): Promise<FindByEmailResponse | null> {
    try {
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
    } catch {
      throw new InternalServerErrorException(
        'Ocorreu um error ao executar a operação',
      );
    }
  }

  public async findByProfile(idcliente: number): Promise<ProfileDTO> {
    try {
      const userData: ClienteEntity = await this.ClienteRepository.findOne({
        where: { idcliente },
      });

      if (!userData) {
        throw new HttpException(
          `Nenhum cliente foi encontrado com esse ${idcliente} `,
          HttpStatus.NOT_FOUND,
        );
      }

      const profile: ClienteOutputDto = this.mapEntityToDto(userData);
      return {
        nome: profile.nome,
        email: profile.email,
        telefone: profile.telefone,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Erro ao realizar esse procedimento',
        );
      }
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      const result: DeleteResult = await this.ClienteRepository.delete(id);

      if (!result.affected) {
        throw new HttpException(
          `Nenhum cliente foi encontrado com o id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Erro ao realizar esse procedimento',
        );
      }
    }
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
