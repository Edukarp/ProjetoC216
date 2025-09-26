import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  type: string; // "Filme" ou "Serie"
  genre: string[];
  year: number;
  rating: number;
  synopsis: string;
  poster: string;
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  genre: { type: [String], required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
  synopsis: { type: String, required: true },
  poster: { type: String, required: true }
});

export default mongoose.model<IMovie>('Movie', MovieSchema);