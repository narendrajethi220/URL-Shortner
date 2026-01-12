import winston, { level } from "winston";
import { getCorrelationId } from "../utils/request.helper";
import DailyRotateFile from "winston-daily-rotate-file";


const levelFilter = (level:string) =>
  winston.format((info) => (info.level === level ? info : false))();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "MM:DD:YYYY HH:mm:ss",
    }),
    winston.format.json(),
    winston.format.printf(({ level, message, timestamp, data }) => {
      const output = {
        level,
        message,
        timestamp,
        correlationId: getCorrelationId(),
        data,
      };
      return JSON.stringify(output);
    })
  ),

  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/errors/%DATE%-error.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      level:'error',
      format:levelFilter('error'),
    }),

    new DailyRotateFile({
      filename: "logs/warnings/%DATE%-warnings.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      level:'warn',
      format: levelFilter("warn"),
    }),

    new DailyRotateFile({
      filename: "logs/info/%DATE%-info.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      format: levelFilter("info")
    }),
  ],
});

export default logger;
