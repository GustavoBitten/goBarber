import {
     Router, request, response
} from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'
import CreateUserService from '@modules/users/services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

const usersRoutes = Router()

const upload = multer(uploadConfig)


usersRoutes.post('/', async (request, response) => {
        const {name, email, password} = request.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({email,name,password})

        delete user.password

        return response.json(user)
})

usersRoutes.patch('/avatar',ensureAuthenticated,upload.single('avatar'),async (request, response)=>{

        const updateUserAvatar = new UpdateUserAvatarService()

        const user = await updateUserAvatar.execute({

            avatarFilename: request.file.filename,
            user_id: request.user.id

        })

        return response.json(user)

} )

export default usersRoutes
