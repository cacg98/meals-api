import { Router } from 'express'

import * as recordController from '../controllers/record'

export const recordRouter = Router()

recordRouter.get('/', recordController.getRecords)
recordRouter.post('/create-or-update', recordController.createOrUpdateRecord)
