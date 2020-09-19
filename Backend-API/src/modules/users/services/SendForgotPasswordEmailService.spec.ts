import FakeMailProvider from '@shared/container/provider/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeMailProvider = new FakeMailProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Kleber',
      email: 'kleber@test.com',
      password: '123123',
    });

    await sendForgotPasswordEmailService.execute({ email: 'kleber@test.com' });

    expect(sendMail).toHaveBeenCalled();
  });
});
