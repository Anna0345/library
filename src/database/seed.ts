import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './mongoose.schema';

async function seed() {
  const uri = 'mongodb://localhost:27017/test';

  await mongoose.connect(uri);

  const password = await bcrypt.hash('password', 10);

  const user = {
    email: 'test@example.com',
    password,
    name: 'Test User',
  };

  await User.create(user);

  console.log('Created user:', user);

  await mongoose.disconnect();
}

seed();
