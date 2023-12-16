import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

// Create a new ratelimiter, that allows 5 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
    /**
     * Optional prefix for the keys used in redis. This is useful if you want to share a redis
     * instance with other applications and want to avoid key collisions. The default prefix is
     * "@upstash/ratelimit"
     */
    prefix: "@upstash/ratelimit",
});
