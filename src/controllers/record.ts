import { Response, NextFunction } from 'express'
import { tryCatchFn } from '../common/utils'
import { CustomRequest } from '../common/interfaces/customRequest'
import * as recordService from '../services/record'

export const getRecords = tryCatchFn( async (req: CustomRequest, res: Response, next: NextFunction) => {
    const records = await recordService.getRecords(req.id)
    res.send(records)
})

export const createOrUpdateRecord = tryCatchFn( async (req: CustomRequest, res: Response, next: NextFunction) => {
    const records = await recordService.createOrUpdateRecord(req.id, req.body)
    res.send(records)
})
