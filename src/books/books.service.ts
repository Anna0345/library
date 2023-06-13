import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

interface Book {
  title: string;
  awsLink: string;
  userId: string;
}

type BookDocument = Book & Document;

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<BookDocument>) {}

  async createBook(
    userId: string,
    title: string,
    awsLink: string,
  ): Promise<Book> {
    return this.bookModel.create({
      userId,
      title,
      awsLink,
    });
  }
}
