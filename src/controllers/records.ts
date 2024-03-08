import { Response, NextFunction } from "express";
import { tryCatchFn } from "../common/utils";
import { CustomRequest } from "../common/interfaces/customRequest";
import { CustomError } from "../common/customError";
import * as recordsService from "../services/records";

export const getRecords = tryCatchFn(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { page, size } = req.query;
    if (!page) throw new CustomError("Missing queryParam: page", 400);
    if (!size) throw new CustomError("Missing queryParam: size", 400);
    const result = await recordsService.getRecords(
      req.id,
      Number(page),
      Number(size)
    );
    res.send(result);
  }
);

export const createOrUpdateRecord = tryCatchFn(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    await recordsService.createOrUpdateRecord(req.id, req.body);
    res.send({});
  }
);
