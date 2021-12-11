import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, FilmModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
