import * as winston from "winston";

const { combine, timestamp, printf } = winston.format;
const formatLogs = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });
const formatMethod = () => combine(
                        timestamp(),
                        formatLogs
                    );
export const logger = winston.createLogger({
    level: 'info',
    format: formatMethod(),
    transports: [
        new winston.transports.Console({
            format:  formatMethod(),
          })
    ],
  });