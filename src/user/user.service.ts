import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User, Film } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private database: PrismaService) {}
  async create(dadosDoUsuario: CreateUserDto): Promise<User> {
    if (dadosDoUsuario.password !== dadosDoUsuario.password_confirmation) {
      throw new UnauthorizedException(
        'A senha e a confirmação da senha não são compativeis',
      );
    }
    const userExists = await this.database.user.findUnique({
      where: { email: dadosDoUsuario.email },
    });

    if (userExists) {
      throw new ConflictException('Esse e-mail já está cadastrado');
    }

    const saltos = 10;
    const hashDaSenha = await bcrypt.hash(dadosDoUsuario.password, saltos);

    delete dadosDoUsuario.password_confirmation;

    const user = await this.database.user.create({
      data: {
        ...dadosDoUsuario,
        password: hashDaSenha,
      },
    });

    delete user.password;
    return user;
  }

  async findMany(): Promise<any[]> {
    const user = await this.database.user.findMany();
    const userNoPass = user.map(({ password, ...resto }) => resto);
    return userNoPass;
  }

  async findUnique(id: string): Promise<User> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User with the given id was not found');
    }

    delete user.password;
    return user;
  }

  async update(id: string, dadosDoUsuario: UpdateUserDto): Promise<User> {
    const user = await this.database.user.update({
      data: dadosDoUsuario,
      where: { id: id },
    });

    delete user.password;

    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User with the given id was not found');
    } else {
      await this.database.user.delete({
        where: { id },
      });
    }

    return {
      message: 'id was found and deleted successfully',
    };
  }

  async addList(userData: User, filmId: string) {
    const film = await this.database.film.findUnique({ where: { id: filmId } });

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    const user = await this.database.user.update({
      where: { id: userData.id },
      data: {
        movies: {
          connect: { id: film.id },
        },
      },
      include: {
        movies: true,
      },
    });
    delete user.password;
    return user;
  }
}
