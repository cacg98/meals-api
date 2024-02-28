import { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
  anchor: { type: String, required: true },
  difficulty: String,
  image: { type: String, required: true },
  name: { type: String, required: true },
  time: String,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Favorite = model("Favorite", favoriteSchema);
