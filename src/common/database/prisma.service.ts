import { PrismaClient, UserModel } from "@prisma/client";
import { inject, injectable } from "inversify";
import { Ilogger } from "../../logger/logger.interface";
import { TYPES } from "../../types";

@injectable()
export class PrismaService{
client: PrismaClient
    @inject(TYPES.Ilogger) private logger: Ilogger
    constructor() {
    this.client= new PrismaClient()
}
async connect():Promise<void>{
    try {
         await this.client.$connect()
    this.logger.log('[PrismaService] Успешное подключение к базе данных')
    } catch (e) {
        if(e instanceof Error){
    this.logger.error('[PrismaService] Ошибка подключения к базе данных' + e.message)

        }
    }
   
}
async disconnect():Promise<void>{
    await this.client.$disconnect()
}
}