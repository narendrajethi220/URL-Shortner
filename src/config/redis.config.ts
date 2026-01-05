import { createClient } from "redis";
import { serverConfig } from "./index";
import logger from "./logger.config";

export const redisClient = createClient({url:serverConfig.REDIS_URL});

redisClient.on('connect',()=>{
    logger.info("Redis Connected");
})

redisClient.on('error',(err)=>{
    logger.error('Redis Error',err);
})

export async function initRedis(){
    try{
        await redisClient.connect();
    }
    catch(err){
          logger.error('RedisConnection Error',err);
          throw err;
    }
}

export async function closeRedis(){
    await redisClient.quit();
}