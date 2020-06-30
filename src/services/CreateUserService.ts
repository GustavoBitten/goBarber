import { getRepository } from "typeorm";
import User from "../models/User";
import { hash } from "bcryptjs";

interface RequestDTO{
    name: string
    email:string
    password:string
}

class CreateUserService{
    public async execute({email,name,password}:RequestDTO): Promise< User >  {
        const usersRepository = getRepository(User)

        const checkUserExists = await usersRepository.findOne({
            where: { email }
        })

        if(checkUserExists) {
            throw new Error('Email address already used')
        }

        const hashPasswd = await hash(password,8)

        const user = usersRepository.create({
            email,
            name,
            password: hashPasswd,
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService