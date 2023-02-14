import { ILogObj, Logger } from "tslog";

export interface Ilogger {
  logger: Logger<ILogObj>;

  log: (...arg: unknown[]) => void;
  error: (...arg: unknown[]) => void;
  warn: (...arg: unknown[]) => void;
}
