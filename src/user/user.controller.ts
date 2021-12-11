import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('create')
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.service.create(data);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.service.update(id, data);
  }

  @Get('findMany')
  findMany(): Promise<any[]> {
    return this.service.findMany();
  }

  @Get('findUnique/:id')
  findUnique(@Param('id') id: string): Promise<User> {
    return this.service.findUnique(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
