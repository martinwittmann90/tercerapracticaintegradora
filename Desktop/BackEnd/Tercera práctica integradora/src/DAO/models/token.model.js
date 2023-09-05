import { Schema, model } from 'mongoose';
const tokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    tokenNumber: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false }
);

const TokenModel = model('tokens', tokenSchema);
export default TokenModel;
