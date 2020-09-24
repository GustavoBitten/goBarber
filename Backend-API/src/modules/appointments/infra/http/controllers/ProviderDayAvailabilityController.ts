import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, day, year } = request.body;

    const listProviderDayAvaliabilityService = container.resolve(
      ListProviderDayAvaliabilityService,
    );

    const availability = await listProviderDayAvaliabilityService.execute({
      day,
      month,
      provider_id,
      year,
    });

    return response.json(availability);
  }
}
