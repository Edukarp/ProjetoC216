import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;   
  movie: mongoose.Types.ObjectId;  
  rating: number;                  
  comment: string;                 
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IReview>('Review', ReviewSchema);