import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreadentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private database: PrismaService, private jwt: JwtService) {}
  async login(loginData: CreadentialsDto) {
    const userExists = await this.database.user.findUnique({
      where: { email: loginData.email },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const validPassword = await bcrypt.compare(
      loginData.password,
      userExists.password,
    );

    if (validPassword) {
      const ticket = {
        email: userExists.email,
      };

      const token = await this.jwt.sign(ticket);

      return { token };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
