import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(6, 150)
  nome: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 15)
  email: string;
}
