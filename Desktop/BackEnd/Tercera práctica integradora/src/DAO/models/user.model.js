import { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
      max: 100,
    },
    lastName: {
      type: String,
      required: false,
      max: 100,
    },
    age: {
      type: Number,
      required: false,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    password: {
      type: String,
      required: false,
      max: 100,
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin', 'premium'],
    },
    cartID: {
      type: String,
      required: false,
      ref: 'carts',
    },
  },
  { versionKey: false }
);

const UserModel = model('users', userSchema);
export default UserModel;
