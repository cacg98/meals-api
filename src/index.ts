import 'dotenv/config'

import express from 'express'

import { dbConnect } from './config/database'

import { appRouter } from './routes'

import { corsMiddleware } from './middlewares/cors'
import { notFoundMiddleware } from './middlewares/notFound'
import { errorHandlerMiddleware } from './middlewares/errorHandler'

import { createClient } from 'redis';

// async function connectRedis() {

//     const client = createClient();
    
//     client.on('ready', () => console.log('Redis Client Ready'));
    
//     client.on('error', err => console.log('Redis Client Error', err));
    
//     await client.connect();
// }

// connectRedis().then(() => console.log('redis works!'))

export let redisClient

(async () => {
  redisClient = createClient();

  redisClient.on('ready', () => console.log('Redis Client Ready'));

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})()

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
