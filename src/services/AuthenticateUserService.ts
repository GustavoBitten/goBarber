import { getRepository } from "typeorm";
import User from "../models/User";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


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

        const token = sign({},'a62077624ca60ba90aea9db8744dbd02',{
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token
        }
    }

}


export default AuthenticateUserService