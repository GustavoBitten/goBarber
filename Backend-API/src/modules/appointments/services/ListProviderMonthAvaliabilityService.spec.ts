import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvaliabilityService: ListProviderMonthAvaliabilityService;

describe('ListProviderMonthAvaliabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvaliabilityService = new ListProviderMonthAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month avalability from provider', async () => {
    async function testWholeDayByHour(hour: number): Promise<void> {
      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    }
    await testWholeDayByHour(8);
    await testWholeDayByHour(9);
    await testWholeDayByHour(10);
    await testWholeDayByHour(11);
    await testWholeDayByHour(12);
    await testWholeDayByHour(13);
    await testWholeDayByHour(14);
    await testWholeDayByHour(15);
    await testWholeDayByHour(16);
    await testWholeDayByHour(17);

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvaliabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
