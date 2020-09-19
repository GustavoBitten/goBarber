import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Kleber',
      email: 'kleber@test.com',
      password: '123123',
    });
    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new User with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Kleber',
      email: 'kleber@test.com',
      password: '123123',
    });
    expect(
      createUserService.execute({
        name: 'Kleber',
        email: 'kleber@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
