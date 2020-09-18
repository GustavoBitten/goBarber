import { getRepository } from "typeorm";
import User from "../entities/User";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/authConfig";
import AppError from "../../../errors/AppError";


interface RequestDTO {
    email: string
    password: string
}

interface ResponseDTO{
    user:User
    token: string
}

class AuthenticateUserService{
    public async execute({email,password}: RequestDTO): Promise<ResponseDTO>{

        const usersRepositoty = getRepository(User)

        const user = await usersRepositoty.findOne({where:{email}})

        if(!user){
            throw new AppError("Incorrect email/password combination",401);
        }

        const passwMatched = await compare(password,user.password)

        if (!passwMatched) {
            throw new AppError("Incorrect email/password combination",401);
        }

        const {expiresIn,secret} = authConfig.jwt

        const token = sign({},secret,{
            subject: user.id,
            expiresIn: expiresIn
        })

        return {
            user,
            token
        }
    }

}


export default AuthenticateUserService
