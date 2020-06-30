import { getRepository } from "typeorm";
import User from "../models/User";
import { hash, compare } from "bcryptjs";


interface RequestDTO {
    email: string
    password: string
}

interface ResponseDTO{
    user:User
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

        return {
            user
        }
    }

}


export default AuthenticateUserService