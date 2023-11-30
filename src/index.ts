import express from 'express'

import { appRouter } from './routes'

import { corsMiddleware } from './middlewares/cors'
import { notFoundMiddleware } from './middlewares/notFound'
import { errorHandlerMiddleware } from './middlewares/errorHandler'

const app = express()
app.use(express.json())
app.use(corsMiddleware())

app.use('/api/v1', appRouter)

app.use('*', notFoundMiddleware)
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
    console.log('server running')
})
