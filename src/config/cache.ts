import { createClient } from 'redis'

export let redisClient

export const initRedis = async () => {
  redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }
  })

  redisClient.on("ready", () => console.log('Redis Client Ready'))

  redisClient.on("error", (error) => console.error(error))

  await redisClient.connect()
}
