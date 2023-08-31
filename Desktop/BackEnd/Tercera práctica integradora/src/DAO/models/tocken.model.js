import { Schema, model } from 'mongoose';
const tockenSchema = new Schema(
  {
    resetToken: {
      type: String,
      required: false,
    },
    resetTokenExpires: {
      type: Date,
      required: false,
    },
  },
  { versionKey: false }
);

const TockenModel = model('tockens', tockenSchema);
export default TockenModel;
