// In mongoose.schema file
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

export const bookSchema = new mongoose.Schema({
  title: String,
  awsLink: String,
  userId: String,
});

export type UserSchema = mongoose.Document & {
  email: string;
  password: string;
  name: string;
};

export const User = mongoose.model<UserSchema>('User', userSchema);
export const Book = mongoose.model('Book', bookSchema);
