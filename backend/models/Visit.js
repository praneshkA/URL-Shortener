import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    shortUrlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShortUrl',
      required: true,
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: false }
);

export const Visit = mongoose.model('Visit', visitSchema);
