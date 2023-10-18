import { LogLevel } from "@shared/configuration";

export type LogFn = (message?: any, ...optionalParams: any[]) => void;

export interface Logger {
  debug: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
}

export interface BrowserLoggerOptions {
  level?: LogLevel;
}

const NO_OP: LogFn = (_message?: any, ..._optionalParams: any[]) => {};

export class BrowserLogger implements Logger {
  readonly debug: LogFn;
  readonly info: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: BrowserLoggerOptions) {
    const { level } = options ?? {};

    this.error = console.error.bind(console);
    if (level === "error") {
      this.warn = NO_OP;
      this.info = NO_OP;
      this.debug = NO_OP;
      return;
    }

    this.warn = console.warn.bind(console);
    if (level === "warn") {
      this.info = NO_OP;
      this.debug = NO_OP;
      return;
    }

    this.info = console.info.bind(console);
    if (level === "info") {
      this.debug = NO_OP;
      return;
    }

    this.debug = console.debug.bind(console);
  }
}
