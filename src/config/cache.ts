import { createClient } from 'redis'

export let redisClient

export const initRedis = async () => {
  redisClient = createClient({
    url: process.env.REDIS_URL
  })

  redisClient.on("ready", () => console.log('Redis Client Ready'))

  redisClient.on("error", (error) => console.error(`Error : ${error}`))

  await redisClient.connect()
}
