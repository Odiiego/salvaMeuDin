import mongoose from 'mongoose';

export const MongoClient = {
  connect(): void {
    mongoose.Promise = Promise;
    mongoose.connect(process.env.MONGO_URL!);
    mongoose.connection.on('error', (error: Error) => console.log(error));
  },
};
