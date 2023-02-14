import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { Ilogger } from "../logger/logger.interface";
import "reflect-metadata";

import { TYPES } from "../types";
import { IUserController } from "./users.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.Ilogger) private loggerService: Ilogger) {
    super(loggerService);
    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }
  login(req: Request, res: Response, next: NextFunction):void {
    console.log('sdfsd')
    next(new HTTPError(401, "ошибка авторизации", "login"));
  }
  register(req: Request, res: Response, next: NextFunction):void {
    this.ok(res, "register");
  }
}
