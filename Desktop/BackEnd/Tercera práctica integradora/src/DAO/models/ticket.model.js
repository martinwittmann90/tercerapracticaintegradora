import { Schema, model } from "mongoose";

const TicketSchema = new Schema(
  {
    code: { type: String, /* unique: true */ },
    purchase_datetime: { type: Date/* , default: Date.now() */},
    amount: { type: Number},
    purchaser: { type: String/* , default: 'user' */ },
    products: [ { product: { type: Object }, _id: false, quantity: { type: Number }, totalPrice: { type: Number } } ],
  },
  { versionKey: false }
);

const TicketModel = model('tickets', TicketSchema);
export default TicketModel;