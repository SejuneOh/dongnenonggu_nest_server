import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://admin:admin@cluster0.erwfvfc.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
