import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import AuthUser from './auth-user.decorator';
import { AuthService } from './auth.service';
import { CreadentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: CreadentialsDto) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  profile(@AuthUser() user: User): User {
    return user;
  }
}
