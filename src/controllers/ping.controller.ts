import { Request, Response } from "express";
import logger from "../config/logger.config";

export const pingHandler = (req: Request, res: Response) => {
  logger.info("Ping from the User");
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    timstamp: new Date().toISOString(),
    message: "pong from ping controller",
  });
};
