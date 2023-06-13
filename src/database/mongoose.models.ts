import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, bookSchema } from './mongoose.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'Book', schema: bookSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongooseDatabaseModule {}
