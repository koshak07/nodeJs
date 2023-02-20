import { Container } from "inversify";
import { ContainerModule } from "inversify/lib/container/container_module";
import { interfaces } from "inversify/lib/interfaces/interfaces";
import { App } from "./app";
import { PrismaService } from "./common/database/prisma.service";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { Ilogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserService } from "./users/users.service";
import { IUserSevice } from "./users/user.service.interface";
import { UserController } from "./users/users.controller";
import { IUserController } from "./users/users.controller.interface";
import { UsersRepository } from "./users/users.repository";
import { IUsersRepository } from "./users/users.repository.interface";

export interface IBootstrapReturn{
    appContainer: Container,
    app: App
}
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<Ilogger>(TYPES.Ilogger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
  bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
  bind<IUserSevice>(TYPES.UserService).to(UserService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});
async function bootstrap(): Promise<IBootstrapReturn> {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  await app.init();
  return { appContainer, app };
}

export const boot = bootstrap();
