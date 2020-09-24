import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { month, year } = request.body;

    const listProviderMonthAvaliabilityService = container.resolve(
      ListProviderMonthAvaliabilityService,
    );

    const availability = await listProviderMonthAvaliabilityService.execute({
      month,
      provider_id,
      year,
    });

    return response.json(availability);
  }
}
