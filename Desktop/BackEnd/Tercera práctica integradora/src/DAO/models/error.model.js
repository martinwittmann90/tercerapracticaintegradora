import { Schema, model } from 'mongoose';

const errorSchema = new Schema(
  {
    timestamp: { type: Date, default: Date.now },
    message: { type: String, required: true },
  },
  { versionKey: false }
);

const ErrorModel = model('errors', errorSchema);

export default ErrorModel;
