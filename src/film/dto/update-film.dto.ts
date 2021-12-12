import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateFilmDto } from './create-film.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  actors: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  producers: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  release_year?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  linkImage: string;
}
