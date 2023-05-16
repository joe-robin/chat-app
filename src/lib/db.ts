import { Redis } from '@upstash/redis'

const requester = {
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
  url: process.env.UPSTASH_REDIS_REST_URL as string,
}
export const db = new Redis(requester)
