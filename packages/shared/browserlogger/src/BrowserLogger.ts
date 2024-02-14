import { LogLevel } from "@shared/configuration";

export type LogFn = (message?: unknown, ...optionalParams: unknown[]) => void;

export interface Logger {
  debug: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
}

export interface BrowserLoggerOptions {
  level?: LogLevel;
}

const NO_OP: LogFn = (_message?: unknown, ..._optionalParams: unknown[]) => {};

export class BrowserLogger implements Logger {
  readonly debug: LogFn;
  readonly info: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: BrowserLoggerOptions) {
    const { level } = options ?? {};

    // eslint-disable-next-line no-console
    this.error = console.error.bind(console);
    if (level === "error") {
      this.warn = NO_OP;
      this.info = NO_OP;
      this.debug = NO_OP;
      return;
    }

    // eslint-disable-next-line no-console
    this.warn = console.warn.bind(console);
    if (level === "warn") {
      this.info = NO_OP;
      this.debug = NO_OP;
      return;
    }

    // eslint-disable-next-line no-console
    this.info = console.info.bind(console);
    if (level === "info") {
      this.debug = NO_OP;
      return;
    }

    // eslint-disable-next-line no-console
    this.debug = console.debug.bind(console);
  }
}
