import {
    Router
} from 'express'
import {
    getCustomRepository
} from 'typeorm'
import {
    parseISO,
} from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()


appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', (request, response) => {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointments = appointmentsRepository.find()
    return response.json(appointments)

})

appointmentsRouter.post('/', async (request, response) => {

    try {
        const {
            provider_id,
            date
        } = request.body

        const parseDate = parseISO(date)

        const createAppointment = new CreateAppointmentService()

        const appointment = await createAppointment.execute({
            date: parseDate,
            provider_id
        })

        return response.json(appointment)

    } catch (error) {
        return response.status(400).json({
            error: error.message
        })

    }
})


export default appointmentsRouter