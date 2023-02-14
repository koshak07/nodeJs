import { injectable } from "inversify/lib/annotation/injectable";
import { ILogObj, Logger } from "tslog";
import "reflect-metadata";
import { Ilogger } from "./logger.interface";

@injectable()
export class LoggerService implements Ilogger {
  public logger: Logger<ILogObj>;
  constructor() {
    this.logger = new Logger({
      name: "myLogger",
      // displayInstanceName: false,
      // displayLoggerName: false,
      // displayFilePath: "hidden",
    });
  }
  log(...arg: unknown[]):void {
    this.logger.info(...arg);
  }
  error(...arg: unknown[]):void {
    this.logger.error(...arg);
  }
  warn(...arg: unknown[]):void {
    this.logger.warn(...arg);
  }
}
