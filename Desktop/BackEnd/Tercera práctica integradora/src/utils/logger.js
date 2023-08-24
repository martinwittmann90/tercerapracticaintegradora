import winston from 'winston';

const logLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};
const logColors = {
  fatal: 'red',
  error: 'red',
  warning: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'gray',
};
const logFormat = winston.format.combine(
  winston.format.colorize({ all: true, colors: logColors }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);
const developmentLogger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
    }),
  ],
});
const errorTransport = new winston.transports.File({
  filename: 'logs/errors.log',
  level: 'error',
  format: winston.format.combine(winston.format.uncolorize(), winston.format.simple()),
});
const productionLogger = winston.createLogger({
  levels: logLevels,
  format: logFormat,
  transports: [
    errorTransport,
    new winston.transports.File({
      filename: 'logs/production.log',
      level: 'info',
      format: winston.format.combine(winston.format.uncolorize(), winston.format.simple()),
    }),
  ],
});

const logger = process.env.NODE_ENV === 'PRODUCTION' ? productionLogger : developmentLogger;

export { logger, developmentLogger, productionLogger };
