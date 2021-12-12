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
    const movieExists = await this.database.film.findUnique({
      where: { name: movieData.name },
    });

    if (movieExists) {
      throw new ConflictException('this movie is already registered');
    }

    const film = await this.database.film.create({ data: movieData });
    return film;
  }

  async findAll(): Promise<Film[]> {
    const movies = await this.database.film.findMany();
    return movies;
  }

  async findOne(id: string): Promise<Film> {
    const movieExists = await this.database.film.findUnique({
      where: { id },
    });

    if (!movieExists) {
      throw new NotFoundException('the movie with the given ID was not found');
    }

    return movieExists;
  }

  async remove(id: string): Promise<{ message: string }> {
    const movieExist = await this.database.film.findUnique({
      where: { id },
    });

    if (!movieExist) {
      throw new NotFoundException('movie with entered ID not found');
    } else {
      await this.database.film.delete({
        where: { id },
      });
    }

    return { message: 'ID was found and deleted' };
  }

  async update(id: string, updateFilmDto: UpdateFilmDto): Promise<Film> {
    const movie = await this.database.film.update({
      where: { id },
      data: updateFilmDto,
    });
    return movie;
  }
}
