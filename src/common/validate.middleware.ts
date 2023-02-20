import { IMiddleware } from "./middlleware.interface";
import { NextFunction, Request, Response, } from "express";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";



export class ValidateMiddleware implements IMiddleware{
    constructor(private classToValidate:ClassConstructor<object>){

    }
    execute({body}: Request, res: Response, next: NextFunction):void{
        const instans = plainToClass(this.classToValidate,body)
        validate(instans).then((errors)=>{
            if(errors.length>0){
                res.status(422).send(errors)
            }else {
                next()
            }
        })
    }

}