import express from "express";
import { serverConfig } from "./config";
import pingRouter from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import connectToDB from "./config/db.config";
import { initRedis } from "./config/redis.config";

const app = express();
const PORT = serverConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", pingRouter);

app.use(genericErrorHandler);

app.listen(PORT, async() => {
  logger.info(`Server is 🚀 on http://localhost:${serverConfig.PORT}`);
  logger.info("Press Ctrl + C to stop the server");
  await initRedis();
  await connectToDB();
});
