import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },
}, { versionKey: false });

const CartModel = model("carts", cartSchema);

export default CartModel;


