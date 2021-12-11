import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  release_year: number;

  @IsString()
  @IsNotEmpty()
  linkImage: string;
}
