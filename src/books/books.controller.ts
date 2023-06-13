import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { S3 } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ConfigService } from '@nestjs/config';

interface Book {
  title: string;
  awsLink: string;
  userId: string;
}

@Controller('library')
export class BooksController {
  private s3: S3;

  constructor(
    private booksService: BooksService,
    private configService: ConfigService,
  ) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBook(@UploadedFile() file, @Request() req): Promise<Book> {
    const { originalname } = file;
    const userId = req.user.id;

    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
    const objectKey = `${uuid()}-${originalname}`;
    const awsRegion = this.configService.get<string>('AWS_REGION');

    const params = {
      Bucket: bucketName,
      Key: objectKey,
      Body: file.buffer,
    };

    await this.s3.putObject(params);

    const awsLink = `https://${bucketName}.s3.${awsRegion}.amazonaws.com/${objectKey}`;

    const book = await this.booksService.createBook(
      userId,
      originalname,
      awsLink,
    );

    return book;
  }
}
