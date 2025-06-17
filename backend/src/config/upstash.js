import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from "dotenv"
dotenv.config() // Load environment variables from .env file

const rateLimit = new Ratelimit(
    {
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, "10s"), // 10 requests per minute
    }
)

export default rateLimit