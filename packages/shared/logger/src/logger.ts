import { createLogger as createWinstonLogger, format, transports } from "winston";
import { getConfiguration } from "@shared/configuration";

const loggerFormat = format.combine(
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

export const logger = createLogger({
  logLevel: getConfiguration().logLevel,
});

export function createLogger({ withConsolePipe = true, logLevel }: CreateLoggerOptions) {
  const logger = createWinstonLogger({
    level: logLevel,
    format: loggerFormat,
    transports: [new transports.File({ filename: "combined.log" })],
  });

  if (withConsolePipe) {
    const consoleTransport = new transports.Console({
      format: format.combine(format.colorize({ all: true }), format.simple()),
    });
    logger.add(consoleTransport);
  }

  return logger;
}

export interface CreateLoggerOptions {
  withConsolePipe?: boolean;
  logLevel: string;
}
