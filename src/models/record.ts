import { Schema, model } from "mongoose"

const recordSchema = new Schema({
    date: { type: Date, default: Date.now },
    image: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Record = model("Record", recordSchema)
