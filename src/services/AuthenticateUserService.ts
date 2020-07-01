import { getRepository } from "typeorm";
import User from "../models/User";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/authConfig";


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
            throw Error("Incorrect email/password combination");
        }
        
        const passwMatched = await compare(password,user.password)
        
        if (!passwMatched) {
            throw Error("Incorrect email/password combination");            
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