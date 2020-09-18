import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import User from "../infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";

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
            throw new AppError('Email address already used')
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
