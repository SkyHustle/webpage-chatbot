import { Redis, RedisConfigNodejs } from "@upstash/redis";

const redisConfig: RedisConfigNodejs = {
    url: process.env.UPSTASH_REDIS_URL!,
    token: process.env.UPSTASH_REDIS_TOKEN!,
};

export const redis = new Redis(redisConfig);
