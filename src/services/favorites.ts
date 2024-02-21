import { Favorite } from "../models/favorite";
import { IFavorite } from "../common/interfaces/favorite";

// TODO paginar lista de favoritos

export async function listFavorites(userId: string) {
  return await Favorite.find({ user: userId }, { user: 0 });
}

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
