import { NextFunction, Request, Response } from "express";
import { inject } from "inversify/lib/annotation/inject";
import { injectable } from "inversify/lib/annotation/injectable";
import { Ilogger } from "../logger/logger.interface";

import "reflect-metadata";

import { TYPES } from "../types";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(TYPES.Ilogger) private logger: Ilogger) {}
  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ):void {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.context}] Ошибка ${err.statusCode} :${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
