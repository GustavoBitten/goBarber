import {
     Router, request, response
} from 'express'
import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '../config/upload'

const usersRoutes = Router()

const upload = multer(uploadConfig)


usersRoutes.post('/', async (request, response) => {

    try {

        const {name, email, password} = request.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({email,name,password})

        delete user.password

        return response.json(user)

    } catch (error) {
        return response.status(400).json({error: error.message})

    }
})

usersRoutes.patch('/avatar',ensureAuthenticated,upload.single('avatar'),async (request, response)=>{
    return response.json({ok:true})
} )

export default usersRoutes