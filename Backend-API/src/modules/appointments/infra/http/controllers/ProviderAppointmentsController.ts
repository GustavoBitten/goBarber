import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderApppointmentsService from '@modules/appointments/services/ListProviderApppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderApppointmentsService = container.resolve(
      ListProviderApppointmentsService,
    );

    const appointments = await listProviderApppointmentsService.execute({
      day,
      month,
      provider_id,
      year,
    });
    return response.json(appointments);
  }
}
