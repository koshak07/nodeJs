import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { ExeptionFilter } from "./errors/exeption.filter";
import { Ilogger } from "./logger/logger.interface";
import { json } from "body-parser";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import "reflect-metadata";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { IUserController } from "./users/users.controller.interface";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { PrismaService } from "./common/database/prisma.service";
import { AuthMiddleware } from "./common/auth.middleware";


@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.Ilogger) private logger: Ilogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.PrismaService) private prismaSevice: PrismaService,

  ) {
    this.app = express();
    this.port = 8000;
  }
  useMiddleware():void{
    this.app.use(json())
    const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'))
    this.app.use(authMiddleware.execute.bind(authMiddleware))
  }
  useRoutes():void {
    this.app.use("/users", this.userController.router);
  }
  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }
  public async init():Promise<void> {
    this.useMiddleware()
    this.useRoutes();
    this.useExeptionFilters();
    await this.prismaSevice.connect()
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
  public close():void{
    this.server.close()
  }
}
