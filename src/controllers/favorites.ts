import { Response, NextFunction } from "express";
import { tryCatchFn } from "../common/utils";
import { CustomRequest } from "../common/interfaces/customRequest";
import { CustomError } from "../common/customError";
import * as favoritesService from "../services/favorites";

export const listFavorites = tryCatchFn(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { page, size } = req.query;
    if (!page) throw new CustomError("Missing queryParam: page", 400);
    if (!size) throw new CustomError("Missing queryParam: size", 400);
    const favorites = await favoritesService.listFavorites(
      req.id,
      Number(page),
      Number(size)
    );
    res.send(favorites);
  }
);

export const findFavorite = tryCatchFn(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const favorite = await favoritesService.findFavorite(
      req.id,
      req.query["anchor"] as string
    );
    res.send(!!favorite);
  }
);

export const createFavorite = tryCatchFn(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    await favoritesService.createFavorite(req.id, req.body);
    res.send({});
  }
);

export const deleteFavorite = tryCatchFn(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    await favoritesService.deleteFavorite(
      req.id,
      req.query["anchor"] as string
    );
    res.send({});
  }
);
