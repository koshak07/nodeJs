import { IConfigService } from "./config.service.interface";
import { config, DotenvConfigOutput,DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { Ilogger } from "../logger/logger.interface";
import { TYPES } from "../types";

@injectable()
export class ConfigService implements IConfigService{
    private config:DotenvParseOutput
    constructor(@inject(TYPES.Ilogger) private logger: Ilogger){
        const result: DotenvConfigOutput = config()
        if(result.error){
            this.logger.error(' [ConfigService] Не удалось прочитать файл .env')
        }else {
            this.logger.log( '[ConfigService] Конфигурация .env прочитана')
            this.config=result.parsed as DotenvParseOutput
        }
    }
    get(key: string):string{
        return this.config[key] 
    };
    
}