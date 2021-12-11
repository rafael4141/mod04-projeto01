import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from '@prisma/client';

@Injectable()
export class FilmService {
  constructor(private database: PrismaService) {}

  async create(movieData: CreateFilmDto): Promise<Film> {
    const plantaExiste = await this.database.film.findUnique({
      where: { name: movieData.name },
    });

    if (plantaExiste) {
      throw new ConflictException('Essa planta já está cadastrada');
    }

    const planta = await this.database.film.create({ data: movieData });
    return planta;
  }

  async findAll(): Promise<Film[]> {
    const movies = await this.database.film.findMany();
    return movies;
  }

  async findOne(id: string): Promise<Film> {
    const plantaExiste = await this.database.film.findUnique({
      where: { id },
    });

    if (!plantaExiste) {
      throw new NotFoundException(
        'Planta com o ID informado não foi encontrado',
      );
    }

    return plantaExiste;
  }

  async update(id: string, updateFilmDto: UpdateFilmDto): Promise<Film> {
    const movie = await this.database.film.update({
      data: updateFilmDto,
      where: { id },
    });
    return movie;
  }

  async remove(id: string): Promise<{ message: string }> {
    const movieExist = await this.database.film.findUnique({
      where: { id },
    });

    if (!movieExist) {
      throw new NotFoundException(
        'Planta com o ID informado não foi encontrado',
      );
    } else {
      await this.database.film.delete({
        where: { id },
      });
    }

    return { message: 'Id foi encontrado e deletado ' };
  }
}
