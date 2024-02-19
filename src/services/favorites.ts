import mongoose from "mongoose";

import { Favorite } from "../models/favorite";
import { IFavorite } from "../common/interfaces/favorite";

export async function findFavorite(userId: string, anchor: string) {
  return await Favorite.findOne({ user: userId, anchor });
}

export async function createFavorite(userId: string, favorite: IFavorite) {
  favorite.user = userId;
  return await Favorite.create(favorite);
}

export async function deleteFavorite(userId: string, anchor: string) {
  return await Favorite.deleteOne({ user: userId, anchor });
}
