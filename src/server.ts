import express, {Request, Response, NextFunction } from "express";
import { serverConfig } from "./config";
import pingRouter from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import connectToDB from "./config/db.config";
import { initRedis } from "./config/redis.config";
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { trpcRouter } from "./routers/tRPC";
import { UrlService } from "./services/url.service";
import { UrlRepository } from "./repositories/url.repository";
import { CacheRepository } from "./repositories/cache.repository";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationIdMiddleware);

app.use('/trpc', createExpressMiddleware({
  router: trpcRouter
}))

app.get("/:shortUrl", async(req:Request, res:Response, next:NextFunction) => {
  const {shortUrl} = req.params;

  const urlService = new UrlService(new UrlRepository(), new CacheRepository());
  
  const url = await urlService.getOriginalUrl(shortUrl);
  
  if(!url){
    res.status(404).json({
      success:false,
      message:"URL not found"
    })
    return;
  }

  await urlService.incrementClicks(shortUrl);
  res.redirect(url.originalUrl);


})

app.use("/api/v1", pingRouter);

app.use(genericErrorHandler);

app.listen(PORT, async() => {
  logger.info(`Server is 🚀 on http://localhost:${serverConfig.PORT}`);
  logger.info("Press Ctrl + C to stop the server");
  await initRedis();
  await connectToDB();
});
