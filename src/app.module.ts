import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, BooksModule],
})
export class AppModule {}
