/**
 * Logger utility for the application
 * Provides different log levels and formatting options
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LoggerOptions {
  level?: LogLevel;
  prefix?: string;
  enableConsole?: boolean;
}

class Logger {
  private level: LogLevel;
  private prefix: string;
  private enableConsole: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = this.getLogLevelFromEnv() || options.level || LogLevel.INFO;
    this.prefix = options.prefix || "";
    this.enableConsole = options.enableConsole !== false;
  }

  private getLogLevelFromEnv(): LogLevel | undefined {
    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    if (!logLevel) return undefined;

    switch (logLevel) {
      case "DEBUG":
        return LogLevel.DEBUG;
      case "INFO":
        return LogLevel.INFO;
      case "WARN":
        return LogLevel.WARN;
      case "ERROR":
        return LogLevel.ERROR;
      case "NONE":
        return LogLevel.NONE;
      default:
        return undefined;
    }
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  setEnableConsole(enable: boolean): void {
    this.enableConsole = enable;
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const prefix = this.prefix ? `[${this.prefix}]` : "";
    return `${timestamp} ${prefix} [${level}] ${message}`;
  }

  private log(level: LogLevel, levelName: string, message: string, ...args: any[]): void {
    if (level >= this.level && this.enableConsole) {
      const formattedMessage = this.formatMessage(levelName, message);

      switch (level) {
        case LogLevel.ERROR:
          console.error(formattedMessage, ...args);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage, ...args);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage, ...args);
          break;
        case LogLevel.DEBUG:
          console.debug(formattedMessage, ...args);
          break;
        default:
          console.log(formattedMessage, ...args);
      }
    }
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, "DEBUG", message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, "INFO", message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, "WARN", message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, "ERROR", message, ...args);
  }
}

// Create a singleton instance
const logger = new Logger();

export default logger;
