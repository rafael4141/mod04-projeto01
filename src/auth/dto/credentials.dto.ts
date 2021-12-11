import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreadentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @isString()
  @isNotEmpty()
  @Length(8, 15)
  password: string;
}
