import { Response, NextFunction } from "express";
import { tryCatchFn } from "../common/utils";
import { CustomRequest } from "../common/interfaces/customRequest";
import * as favoritesService from "../services/favorites";

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
