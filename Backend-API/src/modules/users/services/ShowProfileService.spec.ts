import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'gustavo@gustavo.com',
      password: '123456',
    });

    const updatedUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('Gustavo');
    expect(updatedUser.email).toBe('gustavo@gustavo.com');
  });
  it('should not be able show the profile from non-exisiting user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
