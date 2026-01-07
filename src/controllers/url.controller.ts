import z from "zod";
import logger from "../config/logger.config";
import { CacheRepository } from "../repositories/cache.repository";
import { UrlRepository } from "../repositories/url.repository";
import { publicProcedure } from "../routers/tRPC/context";
import { UrlService } from "../services/url.service";
import { InternalServerError, NotFoundError } from "../utils/app.error";

const urlService = new UrlService(new UrlRepository(), new CacheRepository());

export const urlController ={
    create:publicProcedure
    .input(
        z.object({
            originalUrl: z.string().url('Invalid URL')
        })
    )
    .mutation(async ({input})=>{
        try{
          const result = await urlService.createShortUrl(input.originalUrl);
          return result;
        }
        catch(error){
            logger.error('Error while creating URL', error);
            throw new InternalServerError('Failed to create Short URL');
        }
    }),

    getOriginalUrl:publicProcedure
    .input(
        z.object({
            shortUrl: z.string().min(1,'Min length should be 1')
        })
    )
    .query( async ({input}) => {
        try{
            const result = await urlService.getOriginalUrl(input.shortUrl);
            return result;

        }
        catch(error){
            logger.error('No Original URL found for the shortURL', error);
            throw new NotFoundError('No Original URL Found');
        }
    })
    
}