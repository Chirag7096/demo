import axios from 'axios';
import mongoose from 'mongoose';

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      console.log('MongoDB error' + err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error);
  }
}

export const createModal = (name: string, schema: mongoose.Schema) =>
  mongoose.models?.[name] || mongoose.model(name, schema);

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

export const { get, post } = API;
