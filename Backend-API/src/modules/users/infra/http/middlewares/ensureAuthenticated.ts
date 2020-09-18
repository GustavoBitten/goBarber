import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "@shared/errors/AppError";
import authConfig from "@config/authConfig";

interface TokenPayload{
    iat: number
    exp: number
    sub: string
}

export default function (request: Request,response:Response,next:NextFunction) {

    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("JWT token is missing",401);

    }

    const [,token] = authHeader.split(' ')

    try{
        const decoded = verify(token,authConfig.jwt.secret)

        const {sub} = decoded as TokenPayload

        request.user ={
            id: sub
        }

    }catch{
        throw new AppError("Invalid JWT token",401);

    }

    return next()

}
