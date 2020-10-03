import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviderService = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gustavo.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Paulo',
      email: 'gustavo@gustavo2.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'João',
      email: 'logado@gustavo2.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
