import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Kleber',
      email: 'kleber@test.com',
      password: '123123',
    });
    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new User with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

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
