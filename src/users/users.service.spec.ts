import 'reflect-metadata'
import { UserModel } from "@prisma/client";
import { Container } from "inversify"
import { IConfigService } from "../config/config.service.interface"
import { TYPES } from "../types";
import { User } from "./user.entity";
import { IUserSevice } from "./user.service.interface";
import { IUsersRepository } from "./users.repository.interface";
import { UserService } from "./users.service";

const ConfigServiceMock:IConfigService={
    get:jest.fn()
}
const UsersRepositoryMock:IUsersRepository={
   find:jest.fn(),
   create:jest.fn()
}

const container = new Container()
let configService: IConfigService;
let usersRepository:IUsersRepository;
let userService: IUserSevice;

beforeAll(()=>{
container.bind<IUserSevice>(TYPES.UserService).to(UserService);
container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

userService = container.get<IUserSevice>(TYPES.UserService);
configService = container.get<IConfigService>(TYPES.ConfigService)
usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository)
})
describe('User Service', ()=>{
    it('createUser', async ()=>{
        configService.get= jest.fn().mockReturnValueOnce('1')
        usersRepository.create = jest.fn().mockImplementationOnce((user:User):UserModel=>({
            name:user.name,
            email:user.email,
            password:user.password,
            id: 1,
        }))
        const createdUser = await userService.createUser({
            email: 'dhfj@kjl.ru',
            password: "myName2",
            name: "1"
        })
        expect(createdUser?.id).toEqual(1)
        expect(createdUser?.password).not.toEqual(1)
    })
})