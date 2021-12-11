import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { AuthGuard } from '@nestjs/passport';
import { Film } from '@prisma/client';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  create(@Body() createPlantDto: CreateFilmDto): Promise<Film> {
    return this.filmService.create(createPlantDto);
  }

  @UseGuards(AuthGuard())
  @Get('get-all')
  findAll(): Promise<Film[]> {
    return this.filmService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Film> {
    return this.filmService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updatePlantDto: UpdateFilmDto,
  ): Promise<Film> {
    return this.filmService.update(id, updatePlantDto);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.filmService.remove(id);
  }
}
