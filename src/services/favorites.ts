import mongoose from "mongoose";

import { Favorite } from "../models/favorite";

export async function findFavorite(userId: string, anchor: string) {
  return await Favorite.findOne({ user: userId, anchor });
}

export async function createFavorite(userId: string, favorite: any) {
  favorite.user = userId;
  return await Favorite.create(favorite);
}

export async function deleteFavorite(userId: string, anchor: string) {
  return await Favorite.deleteOne({ user: userId, anchor });
}
