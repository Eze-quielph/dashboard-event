/* eslint-disable no-unused-vars */
import winston from 'winston'

export interface Logger {
  log(message: string): void
  error(message: string): void
}

export class LoggerAdapter implements Logger {
  private readonly loggerInfo: winston.Logger
  private readonly loggerError: winston.Logger
  constructor() {
    this.loggerError = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
      transports: [new winston.transports.File({ filename: 'logs/error.log' })],
    })
    this.loggerInfo = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
      transports: [new winston.transports.File({ filename: 'logs/info.log' })],
    })
  }

  log(message: string): void {
    this.loggerInfo.info(message)
  }

  error(message: string): void {
    this.loggerError.error(message)
  }
}
