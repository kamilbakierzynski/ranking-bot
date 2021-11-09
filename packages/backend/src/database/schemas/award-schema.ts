import mongoose from 'mongoose';

const {Schema} = mongoose;

export const awardSchema = new Schema({
  date: Date,
  user: {type: Schema.Types.ObjectId, ref: "User"},
  place: Number,
  connected: Number,
  onMute: Number,
});