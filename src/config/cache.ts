import { createClient } from 'redis'

export let redisClient

export const initRedis = async () => {
  redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD
  })

  redisClient.on("ready", () => console.log('Redis Client Ready'))

  redisClient.on("error", (error) => {
    console.log(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)
    console.error(process.env.REDIS_PASSWORD)
    console.error(error)
  })

  await redisClient.connect()
}
