import * as expressWinston from "express-winston";
import * as winston from "winston";

const { combine, timestamp, printf } = winston.format;
const formatLogs = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });
const formatMethod = () => combine(
                        timestamp(),
                        formatLogs
                    );

export const loggingMiddleware = () =>
  expressWinston.logger({
    transports: [
        new winston.transports.Console({
            format:  formatMethod(),
          })
    ],
    format: formatMethod(),
    meta: false,
    expressFormat: true,
    colorize: false,
  });