import { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
  anchor: { type: String, required: true },
  difficulty: { type: String, required: true },
  image: { type: String, required: true },
  names: { type: String, required: true },
  time: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Favorite = model("Favorite", favoriteSchema);
