import { createClient } from 'redis'

export let redisClient

export const initRedis = async () => {
  redisClient = createClient({
    socket: {
      host: 'meals-app.eastus.cloudapp.azure.com',
      port: 6379,
    }
  })

  redisClient.on("ready", () => console.log('Redis Client Ready'))

  redisClient.on("error", (error) => console.error(error))

  await redisClient.connect()
}
