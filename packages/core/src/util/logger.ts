import { join } from "path";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { loggingStorage } from "./storage-path";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, service, timestamp, ...meta }) => {
    return `${timestamp} [${service}] ${level}: ${message} ${JSON.stringify(meta)}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    defaultMeta: { service: 'api' },
    transports: [
        new transports.DailyRotateFile({ filename: join(loggingStorage, 'error-%DATE%.log'), level: 'error' }),
        new transports.DailyRotateFile({ filename: join(loggingStorage, 'combined-%DATE%.log') }),
    ],
});
logger.add(new transports.Console());

export let appLogger = logger;
