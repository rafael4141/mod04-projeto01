import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  actors: string;

  @IsString()
  @IsNotEmpty()
  producers: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  release_year: string;

  @IsString()
  @IsNotEmpty()
  linkImage: string;
}
