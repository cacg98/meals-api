import { Response, NextFunction } from 'express'
import { tryCatchFn } from '../common/utils'
import * as recordService from '../services/record'

// TODO: custom request to validate id

export const getRecords = tryCatchFn( async (req, res: Response, next: NextFunction) => {
    const records = await recordService.getRecords(req.id)
    res.send(records)
})

export const createOrUpdateRecord = tryCatchFn( async (req, res: Response, next: NextFunction) => {
    const records = await recordService.createOrUpdateRecord(req.id, req.body)
    res.send(records)
})
