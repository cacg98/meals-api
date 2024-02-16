import { Response, NextFunction } from 'express'
import { tryCatchFn } from '../common/utils'
import { CustomRequest } from '../common/interfaces/customRequest'
import * as recordsService from '../services/records'

export const getRecords = tryCatchFn( async (req: CustomRequest, res: Response, next: NextFunction) => {
    const records = await recordsService.getRecords(req.id)
    res.send(records)
})

export const createOrUpdateRecord = tryCatchFn( async (req: CustomRequest, res: Response, next: NextFunction) => {
    const records = await recordsService.createOrUpdateRecord(req.id, req.body)
    res.send(records)
})
