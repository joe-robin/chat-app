const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const upstashRedisResetToken = process.env.UPSTASH_REDIS_REST_TOKEN

type Command = 'zrange' | 'sismemeber' | 'get' | 'smembers'

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${upstashRedisResetToken}`,
    },
    cache: 'no-store',
  })

  if (!response.ok)
    throw new Error(`Error executing Redis command: ${response.statusText}`)

  const data = await response.json()
  return data.result
}
