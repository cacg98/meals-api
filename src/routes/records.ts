import { Router } from "express";

import * as recordsController from "../controllers/records";

export const recordsRouter = Router();

recordsRouter.get("/", recordsController.getRecords);
recordsRouter.post("/create-or-update", recordsController.createOrUpdateRecord);
recordsRouter.delete("/delete", recordsController.deleteRecords);
recordsRouter.delete("/delete/all", recordsController.deleteAllUserRecords);
