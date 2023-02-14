import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { ExeptionFilter } from "./errors/exeption.filter";
import { Ilogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import "reflect-metadata";

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.Ilogger) private logger: Ilogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
  }
  useRoutes():void {
    this.app.use("/users", this.userController.router);
  }
  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }
  public async init():Promise<void> {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
