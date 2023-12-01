import 'dotenv/config'
import db from './config/database'
import express from 'express'

import { appRouter } from './routes'

import { corsMiddleware } from './middlewares/cors'
import { notFoundMiddleware } from './middlewares/notFound'
import { errorHandlerMiddleware } from './middlewares/errorHandler'

db

const app = express()
app.use(express.json())
app.use(corsMiddleware())

app.use('/api/v1', appRouter)

app.use('*', notFoundMiddleware)
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
    console.log('server running on port', process.env.PORT)
})
