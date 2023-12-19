import 'dotenv/config'

import express from 'express'

import { dbConnect } from './config/database'

import { appRouter } from './routes'

import { corsMiddleware } from './middlewares/cors'
import { notFoundMiddleware } from './middlewares/notFound'
import { errorHandlerMiddleware } from './middlewares/errorHandler'

dbConnect()

const app = express()
app.use(express.json())
app.use(corsMiddleware())

app.use('/api/v1', appRouter)

app.use('*', notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.listen(process.env.PORT, () => {
    console.log('server running on port', process.env.PORT)
})
