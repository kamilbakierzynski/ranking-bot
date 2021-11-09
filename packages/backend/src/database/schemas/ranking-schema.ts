import mongoose from 'mongoose';

const {Schema} = mongoose;

export const rankingSchema = new Schema({
  date: Date,
  places: [{
    user: {type: Schema.Types.ObjectId, ref: "User"},
    place: Number,
    connected: Number,
    onMute: Number
  }],
  awards: [{type: Schema.Types.ObjectId, ref: "Awards"}]
});