import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from '../books/books.controller';
import { BooksService } from './books.service';
import { MongooseDatabaseModule } from '../database/mongoose.models';

@Module({
  imports: [ConfigModule, MongooseDatabaseModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
